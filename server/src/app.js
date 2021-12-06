const express = require("express");
const cors = require("cors");
const notFound = require("./errors/notFound");
const errorHandler = require("./errors/errorHandler")

const usersRouter = require("./users/users.router")
const ntbksRouter = require("./writings/ntbks/ntbks.router")
const chaptersRouter = require("./writings/chapters/chapters.router")
const topicsRouter = require("./writings/topics/topics.router")

const app = express();
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000", // restrict calls to this address
    methods: "GET, DELETE, PUT, CREATE",  // only allow CRUD requests
}));

app.use("/users", usersRouter);
app.use("/notebooks/:userId", ntbksRouter);
app.use("/chapters/:userId", chaptersRouter);
app.use("/topics/:userId", topicsRouter)

app.use(notFound);
app.use(errorHandler)

module.exports = app