const path = require("path");
module.exports = {

  development: {
    client: 'sqlite3', // database type
    connection: {
      filename: path.resolve(__dirname, "src" , "database", "database.db") // where set connection
    },
  pool:{
    afterCreate: (conn, cb) => conn.run("PRAGMA foreign_keys = ON", cb) // delete cascade on
    },
  migrations: {
    directory: path.resolve(__dirname, "src", "database", "knex", "migrations") // where create migrations
  },
  useNullAsDefault: true  
  }
};
