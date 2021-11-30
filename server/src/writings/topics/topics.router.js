const router = require("express").Router({mergeParams: true})
const controller = require("./topics.controller")
const methodNotAllowed = require("../../errors/methodNotAllowed")

router
.route("/:topicId")
.delete(controller.delete)
.put(controller.update)
.all(methodNotAllowed)

router
.route("/")
.get(controller.list)
.post(controller.create)
.all(methodNotAllowed)

module.exports = router

