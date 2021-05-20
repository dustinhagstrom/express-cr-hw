const express = require("express");
const logger = require("morgan");
const path = require("path");

const app = express();

const indexRouter = require("./routes/indexRouter.js");
const todoRouter = require("./routes/todoRouter.js");

//set view engine as ejs
app.set("view engine", "ejs");

//middleware
app.use(logger("dev"));
app.use(express.json());

//http method handler for main root
app.use("/", indexRouter);
app.use("/api/todo", todoRouter);

// app.listen(3000, function () {
//   console.log(`The server is running on port ${3000}`);
// });

module.exports = app;
