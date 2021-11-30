const knex = require("../../db/connection")

const list = () => knex("chapters").select("*")

const create = (newChapter) => 
    knex("chapters")
    .insert(newChapter)
    .returning("*")
    .then(response => response[0])


const destroy = (id) =>
    knex("chapters")
    .where({id})
    .del()

const update = chapterUpdate => 
    knex("chapters")
    .where({id: chapterUpdate.id})
    .update(chapterUpdate,"*")
    .then(response => response[0])

module.exports = {
    list,
    create,
    destroy,
    update
}