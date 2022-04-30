const express = require("express");
const router = express.Router();
const userManagement = require("../controllers/userManagementController");
const userRouter = require("../controllers/userManagementController");
const projectRouter = require("../controllers/projectManagementController");

router.use("/", userRouter);
router.use("/dashboard", projectRouter);

// router.get("/dashboard", verifyToken, userMController.dashboard);

module.exports = router;
