const express = require("express");
const router = express.Router();
const userManagement = require("../controllers/userManagementController");
const userMController = new userManagement();
const projectRouter = require("../controllers/projectManagementController");
router.post("/register", (req, res) => userMController.register(req, res));

router.post("/login", (req, res) => userMController.login(req, res));

router.use("/dashboard", projectRouter);

// router.get("/dashboard", verifyToken, userMController.dashboard);

module.exports = router;
