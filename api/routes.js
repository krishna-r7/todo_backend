const express = require("express");
const baseRoutes = require("./base/base.routes");
const userRoutes = require("./auth/user.routes");
const router = express.Router();

router.use("/todo", baseRoutes);
router.use("/auth", userRoutes);



module.exports = router;