const knex = require("knex");
const environment = process.env.NODE_ENV || "development";
const config = require("../../knexfile")[environment];

let instance = null;

function createInstance() {
  const knexInstance = knex(config);
  return knexInstance;
}

function getInstance() {
  if (!instance) {
    instance = createInstance();
  }
  return instance;
}

module.exports = getInstance;
