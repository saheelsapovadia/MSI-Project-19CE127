const { async } = require("rxjs");
const { client, pool } = require("../Database/database");

class ProjectManagement {
  getAllProjects = async (req, res) => {
    let query = "Select * from projects";
    let projects = await client.query(query, (error, data) => {
      if (error) {
        console.log("error", error);
        res.json({ errorCode: 201, message: "Error in fetching the projects" });
      } else {
        console.log("projects", data.rows);
        res.json(data.rows);
      }
    });
    console.log("logging results..");
  };

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

  uploadBulkProjects = (req, res) => {
    let file = req["files"].files;
    console.log(file);
    console.log("File uploaded: ", file.name);
    res.sendStatus(200);
  };
}

module.exports = ProjectManagement;
