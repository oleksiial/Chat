const { Pool } = require('pg');

const pool = new Pool({
  user: 'oa',
  host: 'localhost',
  database: 'test',
  password: 'password',
  port: 5432
});

module.exports = {
  query: (text, params) => {
    return pool.query(text, params);
  }
};
