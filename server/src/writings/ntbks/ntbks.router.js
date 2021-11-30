const router = require("express").Router({mergeParams: true});
const methodNotAllowed = require("../../errors/methodNotAllowed");
const controller = require("./ntbks.controller");

router
.route("/:ntbkId")
.delete(controller.delete)
.put(controller.update)
.all(methodNotAllowed)

router
.route("/")
.get(controller.list)
.post(controller.create)
.all(methodNotAllowed)

module.exports = router