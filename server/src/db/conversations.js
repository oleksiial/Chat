const { query } = require('./index');

exports.getConversations = async () => {
  const res = await query('select * from conversations');
  return res.rows;
};

exports.getConversationById = async conversationId => {
  const res = await query('select * from conversations where id=$1', [conversationId]);
  return res.rows[0];
};

exports.getConversationsByUserId = async userId => {
  const res = await query(
    `select c.id, c.label, ct.type 
    from user_conversation uc
    join conversations c on uc.conversation_id = c.id
    join conversation_types ct on ct.id = c.type_id
    where user_id=$1`,
    [userId]
  );
  return res.rows;
};

exports.getConversationParticipants = async conversationId => {
  const res = await query(
    'select u.id, u.username from user_conversation uc join users u on uc.user_id = u.id where uc.conversation_id = $1',
    [conversationId]
  );
  return res.rows;
};

exports.checkParticipant = async (userId, conversationId) => {
  const res = await query(
    'select * from user_conversation where user_id = $1 and conversation_id = $2',
    [userId, conversationId]
  );
  return res.rows.length === 1;
};

exports.createConversation = async (typeId, label) => {
  const res = await query(
    'INSERT INTO public.conversations(type_id, label) VALUES($1, $2) returning id, label, (select type from conversation_types ct where ct.id = type_id)',
    [typeId, label]
  );
  return res.rows[0];
};
