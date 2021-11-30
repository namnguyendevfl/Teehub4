const knex = require("../../db/connection")

const list = userId => 
    knex("notebooks")
    .select("*")
    .where({user_id: userId})
    .orderBy("id");

const create = newNtbk => 
    knex("notebooks")
    .insert(newNtbk)
    .returning("*")
    .then((response) => response[0])

const destroy = ntbkId => 
    knex("notebooks")
    .where({id:ntbkId})
    .del()

const update = ntbkUpdated =>
    knex("notebooks")
    .where({id: ntbkUpdated.id})
    .update(ntbkUpdated, "*")
    .then((newNtbk) => newNtbk[0])

module.exports = {
    list,
    create,
    destroy,
    update
} 