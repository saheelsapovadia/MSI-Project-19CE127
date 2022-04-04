const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
//login router
const loginRoute = require("./routes/routes");
const { loadData, deleteData, fetchPassword } = require("./database");

app.use("/", loginRoute);
app.post("/setresources", (res, req) => {
  deleteData();
  loadData();
});
app.listen(process.env.PORT, () => {
  console.log(`Server listening on PORT ${process.env.PORT}`);
});
