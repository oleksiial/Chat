// const { getConversation, getConversationsByUserId } = require('./db/conversations');
// const { getMessages, createMessage, getLastMessage } = require('./db/messages');
const usersReqs = require('./db/users');
const sessionsReqs = require('./db/sessions');
const authReqs = require('./auth');

const run = async () => {
  const users = await usersReqs.getUsers();
  console.log('users', users);

  // const a = await authReqs.signUp('A', '123', '123');
  // console.log(a);

  const a = await authReqs.signIn('A', '123');
  console.log(a);
};

run();
