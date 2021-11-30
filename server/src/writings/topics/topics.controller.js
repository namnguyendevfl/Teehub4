const service = require("./topics.service")
const asyncBoundaryError = require("../../errors/asyncBoundaryError")
const maxId = require("../../utils/maxId")

const list = async (req, res, next) => {
    return res.json({data: await service.list()})
}

const create = async (req, res, next) => {
    const list = await service.list(req.params.userId)
    const newTopic = {
        ...req.body.data,
        id: maxId(list) + 1
    }
    return res.status(201).json({data: await service.create(newTopic)})
}

const destroy = async (req, res, next) => {
    return  service.destroy(req.params.topicId)
            .then(() => res.sendStatus(204))
}

const update = async (req, res, next) => {
    return res.json({data: await service.update(req.body.data)})
}
module.exports = {
    list: [asyncBoundaryError(list)],
    create: [asyncBoundaryError(create)],
    delete: [asyncBoundaryError(destroy)],
    update: [asyncBoundaryError(update)]
}