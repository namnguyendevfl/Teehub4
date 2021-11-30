const knex = require("../db/connection")

const list = () => knex("users").select("*")

module.exports = {
    list
}