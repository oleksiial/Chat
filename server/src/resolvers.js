const { PubSub, withFilter } = require('graphql-subscriptions');
const pubsub = new PubSub();
const MESSAGE_SENT = 'MESSAGE_SENT';

const { getConversationsByUserId, getConversationParticipants } = require('./db/conversations');
const { getMessages, getLastMessage } = require('./db/messages');
const { getUserById, getUsers } = require('./db/users');

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
    me: authenticated((_, __, context) => context.currentUser),
    validate: (_, __, context) => !!context.currentUser
  },
  Mutation: {
    signUp: async (_, { username, password, passwordConfirmation }, { res }) => {
      const authRes = await signUp(username, password, passwordConfirmation);
      res.cookie('sid', authRes.sessionId);
      return authRes.sessionId;
    },
    signIn: async (_, { username, password }, { res }) => {
      const authRes = await signIn(username, password);
      res.cookie('sid', authRes.sessionId);
      return authRes.sessionId;
    },
    signOut: authenticated(async (_, __, { res, currentUser }) => {
      const authRes = await signOut(currentUser.id);
      res.clearCookie('sid');
      return authRes;
    }),
    startConversation: authenticated(async (_, { userId, label }, { currentUser }) => {
      const conversation = await startConversation(currentUser.id, userId, label);
      return conversation;
    }),
    sendMessage: authenticated(async (_, { conversationId, text }, { currentUser }) => {
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
        (payload, variables, { currentUser }) => {
          return (
            payload.conversationId === variables.conversationId &&
            payload.message.user_id !== currentUser.id
          );
        }
      )
    }
  },
  User: {
    conversations: obj => getConversationsByUserId(obj.id).then(res => res)
  },
  Conversation: {
    users: obj => getConversationParticipants(obj.id).then(res => res),
    messages: obj => getMessages(obj.id).then(res => res),
    lastMessage: obj => getLastMessage(obj.id).then(res => res)
  },
  Message: {
    user: obj => getUserById(obj.user_id).then(res => res)
  }
};
