const config = require("../../../knexfile"); // get configs
const knex = require("knex"); // get knex

const connection = knex(config.development); // set config "development: client, connection"

module.exports = connection;