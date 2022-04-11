const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Client } = require("pg");
const privateKey = "saheel";
const { client, pool } = require("../Database/database");
// const loginFunc = new Promise((resolve, reject) => {});

class ProjectManagement {
  addProject = async (req, res) => {
    let {
      id,
      projectname,
      deptcode,
      users,
      product,
      status,
      cieareaid,
      financeproductid,
    } = req.body;
    console.log(
      id,
      projectname,
      deptcode,
      users,
      product,
      status,
      cieareaid,
      financeproductid
    );

    const newProject = await pool.query(
      "insert into projects(id, projectname, deptcode, users, product, status, cieareaid, financeproductid) values($1,$2,$3,$4,$5,$6,$7,$8) Returning *",
      [
        id,
        projectname,
        deptcode,
        users,
        product,
        status,
        cieareaid,
        financeproductid,
      ]
    );
    console.log("new", newProject.rows[0]);
    res.json({
      message: "Project added successfully",
      data: newProject.rows[0],
    });
  };

  getAllProjects = async (req, res) => {
    let query = "Select * from projects";
    let projects = await client.query(query, (error, data) => {
      if (error) {
        console.log("error", error);
        res.json({ errorCode: 201, message: "Error in fetching the projects" });
      } else {
        console.log("projects", data.rows);
        // return data.rows;
        res.json(data.rows);
      }
    });
    console.log("logging results..");
  };
}

module.exports = ProjectManagement;
