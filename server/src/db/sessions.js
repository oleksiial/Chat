const { query } = require('./index');

exports.createSession = async userId => {
  const res = await query('INSERT INTO public.sessions(user_id) VALUES($1) RETURNING id', [userId]);
  return res.rows[0];
};

exports.deleteSession = async userId => {
  const res = await query('DELETE FROM public.sessions WHERE user_id = $1', [userId]);
  return res.rows;
};
