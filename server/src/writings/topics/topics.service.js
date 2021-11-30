const knex = require("../../db/connection")

const list = () => knex("topics").select("*")
const create = (newTopic) => 
    knex("topics")
    .insert(newTopic)
    .returning("*")
    .then(response => response[0])


const destroy = (id) => 
    knex("topics")
    .where({id})
    .del()  
    
const update = topicUpdated => 
    knex("topics")
    .where({id: topicUpdated.id})
    .update(topicUpdated,"*")
    .then(res => res[0])

module.exports = {
    list,
    create,
    destroy,
    update
}