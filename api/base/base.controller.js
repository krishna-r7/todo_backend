const Todo = require("./base.model");



class BaseController {


  createTodo = async (req, res) => {
    try {
      const { title, description, status } = req.body;
      if (!title) return res.status(400).json({ message: "Title is required" });
      const userid = req.user.userId;

      // console.log(user,'user')
      const todo = new Todo({
        title,
        description,
        status,
        userId:userid
      });
      await todo.save();
      res.status(200).json({ status: 200, message: "Todo created successfully", todo });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  getTodos = async (req, res) => {
    try {
      const { page = 1, limit = 10 ,userId } = req.query;
      // const userId = req.user.userId;
      // const userId =req.params.id
      console.log(userId,'sss');

      const todos = await Todo.find({userId})
        .skip((page - 1) * limit)
        .limit(Number(limit));
      const totalTodos = todos.length;

      res.status(200).json({
        message: "Todos retrieved successfully",
        datas:todos,
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
      // if (!title) return res.status(400).json({ status: 400, message: "Title is required" });
      if (!status) return res.status(400).json({ status: 400, message: "Status is required" });
      const todo = await Todo.findByIdAndUpdate(
        id,
        {
          title,
          description,
          status,
        },
        { new: true }
      );
      if (!todo) return res.status(404).json({ status: 404, message: "Todo not found" });
      res.status(200).json({ status: 200, message: "Todo updated successfully", todo });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  deleteTodo = async (req, res) => {
    try {
      const { id } = req.params;
      const todo = await Todo.findByIdAndDelete(id);
      if (!todo) return res.status(404).json({status: 404,  message: "Todo not found" });
      res.status(200).json({ status: 200, message: "Todo deleted successfully", todo });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

};


module.exports = {
  BaseController,
};    
