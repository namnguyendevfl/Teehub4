const router = require("express").Router({mergeParams: true})
const controller = require("./users.controller")
const methodNotAllowed = require("../errors/methodNotAllowed")

router
.route("/login/:userName")
.post(controller.postUserLoggingIn)
// .get(controller.test)
.get(controller.readUserLoggingIn)
.all(methodNotAllowed)

module.exports = router