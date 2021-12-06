const knex = require("../db/connection")

const create = (newUser) => 
    knex("users")
    .insert(newUser)
    .returning("*")
    .then(response => response[0])

const list = () => 
    knex("users")
    .select("*")

module.exports = {
    list,
    create
}