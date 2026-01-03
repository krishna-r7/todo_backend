const express = require("express");
const baseRoutes = require("./base/base.routes");

const router = express.Router();

router.use("/todo", baseRoutes);



module.exports = router;