const { query } = require('./index');

exports.getMessages = async conversation => {
  const res = await query('select * from messages where conversation_id=$1', [conversation]);
  return res.rows;
};

exports.getLastMessage = async conversation => {
  const res = await query(
    'select * from messages where conversation_id=$1 order by id desc limit 1',
    [conversation]
  );
  return res.rows[0];
};

exports.createMessage = async (sender, conversation, text) => {
  const res = await query(
    'INSERT INTO public.messages(sender_id, conversation_id, text) VALUES($1, $2, $3) RETURNING id, text, sender_id',
    [sender, conversation, text]
  );
  return res.rows[0];
};
