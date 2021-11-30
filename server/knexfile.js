// Update with your config settings.
const path = require("path");
require("dotenv").config();
const { DATABASE_URL } = process.env;

const url = 'postgres://xjmzshcw:5K73eYmnPGL2WQc7MmpjL_LjXPCrD5jk@fanny.db.elephantsql.com/xjmzshcw'
module.exports = {

  development: {
    client: 'postgresql',
    connection: url,
    migrations: {
      directory : path.join(__dirname, "src", "db", "migrations")  
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds")
    }
  },


  // staging: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user:     'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // },

  // production: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user:     'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // }

};
