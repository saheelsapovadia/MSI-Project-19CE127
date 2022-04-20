const fs = require("fs");
const Pool = require("pg").Pool;
const fastcsv = require("fast-csv");
const ErrorMessage = require("./Classes/ErrorMessage");
const { pool } = require("./Database/database");
let csvData = [];
let bulkImportLogs = {
  totalData: 0,
  successfullyInserted: 0,
  failed: 0,
  failedRowList: [],
};
const loadData = (filename) => {
  console.log("filename ", filename);
  let stream = fs.createReadStream("./uploads/" + filename);
  // let stream = fs.createReadStream("../resources.csv");
  // let stream = fs.createReadStream("../dummyData.csv");
  let csvStream = fastcsv
    .parse()
    .on("data", function (data) {
      csvData.push(data);
    })
    .on("end", function () {
      // remove the first line: header
      csvData.shift();
      const query =
        "insert into projects(projectname, deptcode, users, product, status, cieareaid, financeproductid) values($1,$2,$3,$4,$5,$6,$7) Returning *";

      pool.connect((err, client, done) => {
        if (err) throw err;
        try {
          bulkImportLogs.totalData = csvData.length;
          console.log("csvdata", csvData);
          csvData.forEach((row, index) => {
            console.log("row ", index, " : ", row, row.length);
            client.query(query, row, (err, res) => {
              if (err) {
                // console.log(err.message);
                bulkImportLogs.failed++;
                const Error = new ErrorMessage(index + 1, err.message);
                bulkImportLogs.failedRowList.push(Error);
                console.log(bulkImportLogs);
              } else {
                console.log(row);
                console.log("inserted " + res.rowCount + " row:", row);
                bulkImportLogs.successfullyInserted++;
                console.log(bulkImportLogs);
              }
            });
          });
        } finally {
          done();
        }
      });
    });
  stream.pipe(csvStream);
};

const deleteData = () => {
  // create a new connection to the database
  const pool = new Pool({
    host: "localhost",
    user: "postgres",
    database: "motorola",
    password: "root",
    port: 5432,
  });
  const query = "DELETE from resource_allocation";
  pool.connect((err, client, done) => {
    if (err) throw err;
    try {
      client.query(query, (err, res) => {
        if (err) {
          console.log(err.stack);
        } else {
          console.log("Deleted All the rows");
        }
      });
    } finally {
      done();
    }
  });
};

const fetchPassword = (username) => {
  // create a new connection to the database
  const pool = new Pool({
    host: "localhost",
    user: "postgres",
    database: "motorola",
    password: "root",
    port: 5432,
  });
  let hashed_password = [];
  const query = "Select password from users where username=$1";
  pool.connect((err, client, done) => {
    if (err) throw err;
    try {
      client.query(query, [username], (err, res) => {
        if (err) {
          console.log(err.stack);
        } else {
          hashed_password = res.rows;
          console.log(hashed_password[0].password);
          return hashed_password[0].password;
        }
      });
    } finally {
      done();
    }
  });
};
module.exports = { loadData, deleteData, fetchPassword };
