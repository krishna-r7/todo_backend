const express = require("express");
const userRoutes = require("./base/base.routes");

const router = express.Router();

router.use("/base/user", userRoutes);



module.exports = router;