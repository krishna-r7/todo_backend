const Todo = require("./base.model");



class BaseController {


  createTodo = async (req, res) => {
    try {
      const { title, description, status } = req.body;
      if (!title) return res.status(400).json({ message: "Title is required" });x``
      if (!status) return res.status(400).json({ message: "Status is required" });
      const todo = new Todo({
        title,
        description,
        status,
      });
      await todo.save();
      res.status(201).json({ message: "Todo created successfully", todo });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  getTodos = async (req, res) => {
    try {
      const { page = 1, limit = 10 } = req.query;
      const todos = await Todo.find()
        .skip((page - 1) * limit)
        .limit(Number(limit));
      const totalTodos = await Todo.countDocuments();

      res.status(200).json({
        message: "Todos retrieved successfully",
        todos,
        totalTodos,
        currentPage: Number(page),
        totalPages: Math.ceil(totalTodos / limit),
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  updateTodo = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, status } = req.body;
      if (!title) return res.status(400).json({ message: "Title is required" });
      if (!status) return res.status(400).json({ message: "Status is required" });
      const todo = await Todo.findByIdAndUpdate(
        id,
        {
          title,
          description,
          status,
        },
        { new: true }
      );
      if (!todo) return res.status(404).json({ message: "Todo not found" });
      res.status(200).json({ message: "Todo updated successfully", todo });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  deleteTodo = async (req, res) => {
    try {
      const { id } = req.params;
      const todo = await Todo.findByIdAndDelete(id);
      if (!todo) return res.status(404).json({ message: "Todo not found" });
      res.status(200).json({ message: "Todo deleted successfully", todo });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

};


module.exports = {
  BaseController,
};    
