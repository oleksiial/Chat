const DataLoader = require('dataloader');
const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();
const userLoader = new DataLoader(id => Promise.all([getUser(id[0])]));

const MESSAGE_CREATED = 'MESSAGE_CREATED';

const { getConversation, getConversationsByUserId } = require('./db/conversations');
const { getMessages, createMessage, getLastMessage } = require('./db/messages');
const { getUser, getUsers, getUserByConversationId } = require('./db/users');

exports.resolvers = {
  Query: {
    users: () => getUsers().then(res => res),
    user: (_, { id }) => userLoader.load(id).then(res => res),
    messages: (_, { conversationId }) => getMessages(conversationId).then(res => res)
  },
  Mutation: {
    createMessage: async (_, { senderId, conversationId, text }) => {
      const message = createMessage(senderId, conversationId, text);
      await pubsub.publish(MESSAGE_CREATED, { newMessage: message });
      return message;
    }
  },
  Subscription: {
    newMessage: { subscribe: () => pubsub.asyncIterator([MESSAGE_CREATED]) }
  },
  User: {
    conversations: obj => getConversationsByUserId(obj.id).then(res => res)
  },
  Conversation: {
    users: obj => getUserByConversationId(obj.id).then(res => res),
    messages: obj => getMessages(obj.id).then(res => res),
    lastMessage: obj => getLastMessage(obj.id).then(res => res)
  },
  Message: {
    sender: obj => userLoader.load(obj.sender_id).then(res => res)
  }
};
