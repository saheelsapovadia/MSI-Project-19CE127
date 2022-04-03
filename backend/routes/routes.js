const express = require("express");
const res = require("express/lib/response");
const router = express.Router();
const bcrypt = require("bcrypt");
const userManagement = require("../controllers/userManagementController");
const userMController = new userManagement();
router.post("/register", (req, res) => userMController.register(req, res));

router.post("/login", (req, res) => userMController.login(req, res));

router.post("/verifytoken", (req, res) =>
  userMController.verifyToken(req, res)
);
module.exports = router;
