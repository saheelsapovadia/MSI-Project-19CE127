const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const privateKey = "saheel";
const { client } = require("../Database/database");
const router = require("express").Router();
const UserManagement = require("../API/userManagement");
// const loginFunc = new Promise((resolve, reject) => {});

const userManagement = new UserManagement();

router.get("/getusers", userManagement.getAllUsers);
router.post("/adduser", userManagement.addUser);
router.post("/register", (req, res) => userManagement.register(req, res));

router.post("/login", (req, res) => userManagement.login(req, res));

module.exports = router;
