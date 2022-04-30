const { async } = require("rxjs");
const { client, pool } = require("../Database/database");
const fastcsv = require("fast-csv");
const fs = require("fs");
const path = require("path");

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
  };

  addProject = async (req, res) => {
    let {
      projectname,
      deptcode,
      users,
      product,
      status,
      cieareaid,
      financeproductid,
    } = req.body;
    console.log(
      projectname,
      deptcode,
      users,
      product,
      status,
      cieareaid,
      financeproductid
    );

    const newProject = await pool.query(
      "insert into projects(projectname, deptcode, users, product, status, cieareaid, financeproductid) values($1,$2,$3,$4,$5,$6,$7) Returning *",
      [
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
  exportBulkProjects = (req, response) => {
    const ws = fs.createWriteStream("./bezkoder_postgresql_fastcsv.csv");

    pool.connect((err, client, done) => {
      if (err) throw err;
      client.query("SELECT * FROM projects", (err, res) => {
        done();
        if (err) {
          console.log(err.stack);
        } else {
          const jsonData = JSON.parse(JSON.stringify(res.rows));
          // console.log("jsonData", jsonData);
          // TODO: export to CSV file
          // downloadResource(
          //   response,
          //   "./bezkoder_postgresql_fastcsv.csv",
          //   res.rows
          // );
          fastcsv
            .write(jsonData, { headers: true })
            .on("finish", function () {
              console.log(
                "Write to bezkoder_postgresql_fastcsv.csv successfully!"
              );
              var options = {
                root: path.join(__dirname),
              };
              console.log("Sending file in the response");
              var fileName = "bezkoder_postgresql_fastcsv.csv";
              response.header("Content-Type", "text/csv");
              response.download("./bezkoder_postgresql_fastcsv.csv");
              // response.download(
              //   path.join(__dirname) + "/bezkoder_postgresql_fastcsv.csv",
              //   fileName,
              //   (err) => {
              //     if (err) {
              //       response.status(500).send({
              //         message: "Could not download the file. " + err,
              //       });
              //     }
              //   }
              // );
              // response.status(200).send(fileName);
              let fields = [{}];
            })
            .pipe(ws);
        }
      });
    });
  };
  deleteProject = async (req, res) => {
    let { id } = req.body;
    const result = await pool.query("DELETE from projects where id=$1", [id]);
    console.log("deleting project with id", id, result);
    res.sendStatus(200);
  };
  updateProject = async (req, res) => {
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
    const newProject = await pool
      .query(
        "UPDATE projects set projectname = $2, deptcode = $3, users = $4, product = $5, status = $6, cieareaid = $7, financeproductid = $8, updatedat=NOW() WHERE id = $1",
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
      )
      .catch((err) => {
        console.log(err);
      });
    console.log("updated the project", newProject.rows[0]);
    res.json({
      message: "Project updated successfully",
      data: newProject.rows[0],
    });
  };
}

// const downloadResource = (res, fileName, data) => {
//   const json2csv = new Parser();
//   const csv = json2csv.parse(data);
//   res.header("Content-Type", "text/csv");
//   res.attachment(fileName);
//   return res.send(csv);
// };

module.exports = ProjectManagement;
