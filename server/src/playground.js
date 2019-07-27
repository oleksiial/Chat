// const { getConversation, getConversationsByUserId } = require('./db/conversations');
// const { getMessages, createMessage, getLastMessage } = require('./db/messages');
const usersReqs = require('./db/users');
const sessionsReqs = require('./db/sessions');
const convReqs = require('./db/conversations');
const messageReqs = require('./db/messages');

const { startConversation, sendMessage } = require('./api/conversations');
const authReqs = require('./api/auth');

const run = async () => {
  const message = await sendMessage(1, 1, 'Hello from A playground');
  console.log(message);
};

run();
