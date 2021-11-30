const service = require("./ntbks.service")
const asyncBoundaryError = require("../../errors/asyncBoundaryError")
const maxId = require("../../utils/maxId")

const list = async (req, res, next) => {
    return res.json({data: await service.list(req.params.userId)})
}

// const maxId = (list) => {
//     return list.reduce((maxId, item) => Math.max(maxId, item.id), -1)
// }

const create = async (req, res, next ) => {
    const list = await service.list(req.params.userId)
    const newNtbk = {
        ...req.body.data,
        id: maxId(list) + 1
    }
    return res.status(201).json({data: await service.create(newNtbk)})
}

const destroy = (req, res, next) => {
    return service.destroy(req.params.ntbkId)
    .then(() => res.sendStatus(204))
    .catch()
}

const update = async (req, res, next) => {
    return res.json({data: await service.update(req.body.data)})
}
module.exports = {
    list: [asyncBoundaryError(list)],
    create: [asyncBoundaryError(create)],
    delete: [asyncBoundaryError(destroy)],
    update: [asyncBoundaryError(update)],
}