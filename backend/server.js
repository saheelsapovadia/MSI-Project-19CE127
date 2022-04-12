const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
const fileUpload = require("express-fileupload");
app.use(cors());
app.use(express.json());
const multipart = require("connect-multiparty");
const multipartMiddleware = multipart({
  uploadDir: "./uploads",
});
// app.use(fileUpload());
const routes = require("./routes/routes");
const { loadData, deleteData, fetchPassword } = require("./database");
app.post("/dashboard/uploadbulkproject", multipartMiddleware, (req, res) => {
  res.json({
    message: "File uploaded succesfully.",
  });
});
app.use("/", routes);

app.post("/setresources", (res, req) => {
  deleteData();
  loadData();
});
app.listen(process.env.PORT, () => {
  console.log(`Server listening on PORT ${process.env.PORT}`);
});
