const { query } = require('./index');

exports.getMessages = async conversationId => {
  const res = await query('select * from messages where conversation_id=$1', [conversationId]);
  return res.rows;
};

exports.getLastMessage = async conversationId => {
  const res = await query(
    'select * from messages where conversation_id=$1 order by id desc limit 1',
    [conversationId]
  );
  return res.rows[0];
};

exports.createMessage = async (userId, conversationId, text) => {
  const res = await query(
    'INSERT INTO public.messages(user_id, conversation_id, text) VALUES($1, $2, $3) RETURNING id, text, user_id, conversation_id',
    [userId, conversationId, text]
  );
  return res.rows[0];
};
