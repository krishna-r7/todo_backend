const express = require("express");
const { BaseController} = require("../base/base.controller");
const router = express.Router();

const baseController = new BaseController();

router.post("/createTodo", baseController.createTodo);
router.get("/getTodos", baseController.getTodos);
router.put("/updateTodo/:id", baseController.updateTodo);
router.delete("/deleteTodo/:id", baseController.deleteTodo);



module.exports = router;