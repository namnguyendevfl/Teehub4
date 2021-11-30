const maxId = (list) => list.reduce((maxId, item) => Math.max(maxId, item.id), -1)

module.exports = maxId