const bcrypt = require('bcrypt');

const { createUser, getUserByUsername, getUserBySessionId } = require('../db/users');
const { createSession, deleteSession } = require('../db/sessions');

const signUp = async (username, password, passwordConfirmation) => {
  if (password !== passwordConfirmation) {
    throw new Error('passwords dont match');
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  const user = await createUser(username, passwordHash);

  const sessionId = await createSession(user.id);

  return { user, sessionId: sessionId.id };
};

const signIn = async (username, password) => {
  const user = await getUserByUsername(username);
  if (!user) {
    throw new Error('Username not found');
  }

  const same = await bcrypt.compare(password, user.password_hash);
  if (!same) {
    throw new Error('Password is wrong');
  }

  await deleteSession(user.id);
  const sessionId = await createSession(user.id);

  return { user: { id: user.id, username: user.username }, sessionId: sessionId.id };
};

const signOut = async userId => {
  const result = await deleteSession(userId);
  return true;
};

const exchangeSessionId = async sessionId => getUserBySessionId(sessionId);

module.exports = {
  signUp,
  signIn,
  signOut,
  exchangeSessionId
};
