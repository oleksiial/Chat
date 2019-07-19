const { query } = require('./index');

exports.createUser = async name => {
  const res = await query('INSERT INTO public.users(name) VALUES($1)', [name]);
  return res.rows;
};

exports.getUser = async id => {
  const res = await query('select id, name from users where id=$1', [id]);
  return res.rows[0];
};

exports.getUserByConversationId = async convId => {
  const res = await query(
    'select id, name from user_conversation join users on user_id = id where conversation_id=$1',
    [convId]
  );
  return res.rows;
};

exports.getUsers = async () => {
  const res = await query('select id, name from users');
  return res.rows;
};

exports.joinRoom = async () => {
  const res = await query('select id, name from users');
  return res.rows;
};
