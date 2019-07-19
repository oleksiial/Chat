const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'chat_dev',
  password: 'password',
  port: 5432
});

let count = 0;
module.exports = {
  query: (text, params, callback) => {
    console.log(++count);
    return pool.query(text, params, callback);
  }
};
