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

exports.getUserByConversationId = async conversationId => {
  const res = await query(
    'select id, username from user_conversation join users on user_id = id where conversation_id=$1',
    [conversationId]
  );
  return res.rows[0];
};

exports.getUserBySessionId = async sessionId => {
  const res = await query(
    'select u.id, u.username from sessions join users u on user_id = u.id where id=$1',
    [sessionId]
  );
  return res.rows[0];
};

exports.getUsers = async () => {
  const res = await query('select id, username from users');
  return res.rows;
};
