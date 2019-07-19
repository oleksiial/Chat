const { query } = require('./index');

exports.getConversations = async () => {
  const res = await query('select * from conversations');
  return res.rows;
};

exports.getConversation = async id => {
  const res = await query('select * from conversations where id=$1', [id]);
  return res.rows[0];
};

exports.getConversationsByUserId = async userId => {
  const res = await query(
    'select id, label, type_id as type from user_conversation join conversations on conversation_id = id where user_id=$1',
    [userId]
  );
  return res.rows;
};

exports.getConversationParticipants = async id => {
  const res = await query(
    'select user_id, name from user_conversation join users on user_conversation.user_id = users.id where conversation_id = $1',
    [id]
  );
  return res.rows;
};

exports.joinConversation = async (conversation_id, user_id) => {
  const res = await query(
    'INSERT INTO public.user_conversation(user_id, conversation_id) VALUES ($1, $2)',
    [user_id, conversation_id]
  );
  return res.rows;
};

exports.createConversation = async (type, label) => {
  const res = await query('INSERT INTO public.conversations(type_id, label) VALUES($1, $2)', [
    type,
    label
  ]);
  return res.rows;
};
