const express = require("express");
const router = express.Router();

const uuidv4 = require("uuid").v4;

let todos = [
  {
    id: "haf24jd",
    todo: "do laundry",
    done: "false",
  },
  {
    id: "jp2nkl2",
    todo: "wash dishes",
    done: "true",
  },
];

router.get("/get-all-todos", function (req, res) {
  res.json({ payload: todos });
});

router.get("/get-todo-by-id/:id", function (req, res) {
  let isFound = false;
  todos.forEach(function (item) {
    if (item.id === req.params.id) {
      isFound = true;
      res.json({
        id: item.id,
        todo: item.todo,
        done: item.done,
      });
    }
  });

  if (!isFound) {
    res.json({
      message:
        "The Todo ID you are looking for does not exists, please check ID",
    });
  }
});

router.get("/get-todos-by-done/:boolean", function (req, res) {
  let newDoneArray = [];
  let atLeastOneMatches = false;
  todos.forEach(function (item) {
    if (req.params.boolean === item.done) {
      atLeastOneMatches = true;
      newDoneArray.push(item);
    }
  });
  if (atLeastOneMatches) {
    res.json({ payload: newDoneArray });
  } else {
    res.json({ message: "We don't have any todos that match!" });
  }
});

router.post("/create-new-todo", function (req, res) {
  let newTodo = {
    id: uuidv4(),
    todo: req.body.todo,
    done: false,
  };
  let canCreate = true;
  todos.forEach(function (item) {
    if (req.body.todo === item.todo) {
      canCreate = false;
    }
  });
  if (canCreate) {
    todos.push(newTodo);
    res.json({ payload: todos });
  } else {
    res.json({ message: "This todo already exists." });
  }
});

module.exports = router;
