const { PubSub, withFilter } = require('graphql-subscriptions');
const pubsub = new PubSub();
const MESSAGE_SENT = 'MESSAGE_SENT';
const NEW_CONVERSATION = 'NEW_CONVERSATION';

const {
  getConversationsByUserId, getConversationParticipants, getConversationById
} = require('./db/conversations');
const { getMessages, getLastMessage } = require('./db/messages');
const { getUserById, getUsers, getUsersByUsernameTemplate } = require('./db/users');

const { signUp, signIn, signOut } = require('./api/auth');
const { startConversation, sendMessage } = require('./api/conversations');

const authenticated = next => (root, args, context, info) => {
  if (!context.currentUser) {
    throw new Error(`Unauthenticated!`);
  }
  return next(root, args, context, info);
};

exports.resolvers = {
  Query: {
    users: () => getUsers().then(res => res),
    user: (_, { id }) => getUserById(id).then(res => res),
    messages: (_, { conversationId }) => getMessages(conversationId).then(res => res),
    conversation: (_, { conversationId }) => getConversationById(conversationId).then(res => res),
    me: authenticated((_, __, context) => context.currentUser),
    authData: (_, __, { sessionId, currentUser }) => ({ isLoggedIn: !!currentUser, user: currentUser, sid: sessionId }),
    search: authenticated(async (_, { pattern }, { currentUser }) => {
      const users = await getUsersByUsernameTemplate(pattern)
      return { users: users.filter(user => user.id !== currentUser.id) };
    }),
  },
  Mutation: {
    signUp: async (_, { username, password, passwordConfirmation }, { res }) => {
      const authRes = await signUp(username, password, passwordConfirmation);
      res.cookie('sid', authRes.sessionId);
      return { isLoggedIn: !!authRes.user, user: authRes.user, sid: authRes.sessionId }
    },
    signIn: async (_, { username, password }, { res }) => {
      const authRes = await signIn(username, password);
      res.cookie('sid', authRes.sessionId);
      return { isLoggedIn: !!authRes.user, user: authRes.user, sid: authRes.sessionId }
    },
    signOut: authenticated(async (_, __, { res, currentUser }) => {
      const authRes = await signOut(currentUser.id);
      res.clearCookie('sid');
      return { isLoggedIn: !authRes, user: null, sid: null }
    }),
    startConversation: authenticated(async (_, { userId }, { currentUser }) => {
      const conversation = await startConversation(currentUser.id, userId);
      pubsub.publish(NEW_CONVERSATION, { newConversation: conversation });
      return conversation;
    }),
    sendMessage: authenticated(async (_, { conversationId, text }, { currentUser }) => {
      if (text.trim() === '') {
        throw new Error('message text is empty')
      }

      const message = await sendMessage(currentUser.id, conversationId, text);
      pubsub.publish(MESSAGE_SENT, {
        message,
        conversationId
      });
      return message;
    })
  },
  Subscription: {
    message: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(MESSAGE_SENT),
        async ({ message }, _, { currentUser }) => {
          const conversations = await getConversationsByUserId(currentUser.id);
          return message.user_id !== currentUser.id && conversations.map(c => c.id).includes(message.conversation_id)
        }
      )
    },
    newConversation: {
      subscribe: () => pubsub.asyncIterator(NEW_CONVERSATION)
    }
  },
  AuthResponse: {
    id: () => 1
  },
  User: {
    conversations: obj => getConversationsByUserId(obj.id).then(res => res)
  },
  Conversation: {
    users: obj => getConversationParticipants(obj.id).then(res => res),
    messages: async (obj) => await getMessages(obj.id),
    lastMessage: obj => getLastMessage(obj.id).then(res => res)
  },
  Message: {
    user: obj => getUserById(obj.user_id).then(res => res),
    conversation: obj => getConversationById(obj.conversation_id).then(res => res),
  }
};
