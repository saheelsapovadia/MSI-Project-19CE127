const router = require("express").Router();

const ProjectManagement = require("../API/projectManagement");

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

module.exports = router;
