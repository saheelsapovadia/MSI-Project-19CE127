const router = require("express").Router();
const ProjectManagement = require("../API/projectManagement");
const multer = require("multer");

const multipart = require("connect-multiparty");
const multipartMiddleware = multipart({ uploadDir: "./uploads" });

// const loginFunc = new Promise((resolve, reject) => {});

const projectManagement = new ProjectManagement();

// @route   GET projects
// @desc    Get all projects
// @access  Private
router.get("/getprojects", projectManagement.getAllProjects);

// @route   POST addproject
// @desc    Add new project
// @access  Private
router.post("/addproject", projectManagement.addProject);

// @route   POST uploadbulkproject
// @desc    Add new projects using csv file
// @access  Private
router.post("/uploadbulkproject", multipartMiddleware, (req, res) => {
  let file = req["files"].files;
  console.log(file);
  console.log("File uploaded: ", file.name);
  res.sendStatus(200);
});
module.exports = router;
