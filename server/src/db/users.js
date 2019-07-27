const { query } = require('./index');

exports.createUser = async (username, passwordHash) => {
  const res = await query(
    'INSERT INTO public.users(username, password_hash) VALUES($1, $2) RETURNING id, username',
    [username, passwordHash]
  );
  return res.rows[0];
};

exports.getUserById = async id => {
  const res = await query('select id, username from users where id=$1', [id]);
  return res.rows[0];
};

exports.getUserByUsername = async username => {
  const res = await query('select id, username, password_hash from users where username=$1', [
    username
  ]);

  return res.rows[0];
};

exports.getUsersByUsernameTemplate = async username => {
  const res = await query('select id, username from users where username like $1', [username]);
  return res.rows;
};

exports.getUserBySessionId = async sessionId => {
  const res = await query(
    'select u.id, u.username from sessions s join users u on s.user_id = u.id where s.id=$1',
    [sessionId]
  );
  return res.rows[0];
};

exports.getUsers = async () => {
  const res = await query('select id, username from users');
  return res.rows;
};

exports.joinConversation = async (userId, conversationId) => {
  const res = await query(
    'INSERT INTO public.user_conversation(user_id, conversation_id) VALUES ($1, $2)',
    [userId, conversationId]
  );
  return res.rows;
};
