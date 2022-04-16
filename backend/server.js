const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
const fileUpload = require("express-fileupload");
app.use(cors());
app.use(express.json());
const multipart = require("connect-multiparty");
const jwt = require("jsonwebtoken");
const multipartMiddleware = multipart({
  uploadDir: "./uploads",
});
const multer = require("multer");

function extractToken(req) {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  } else if (req.query && req.query.token) {
    return req.query.token;
  }
  return null;
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    let header = extractToken(req);
    console.log("headers", header);
    jwt.verify(header, "saheel", function (err, decoded) {
      if (err) {
        throw new Error("Error : " + err);
      }
      console.log("username", decoded);
      cb(null, decoded.user.split(" ")[0] + file.originalname);
    });
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    // cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});
const upload = multer({ storage: storage });

// app.use(fileUpload());
const routes = require("./routes/routes");
const { loadData, deleteData, fetchPassword } = require("./database");
const { default: jwtDecode } = require("jwt-decode");

app.post(
  "/dashboard/uploadbulkproject",
  upload.single("uploads[]"),
  (req, res) => {
    let header = extractToken(req);

    jwt.verify(header, "saheel", function (err, decoded) {
      if (err) {
        throw new Error("Error : " + err);
      }

      loadData(decoded.user.split(" ")[0] + req.file.originalname);
    });
    res.json({
      message: `${req.file.originalname}` + " uploaded succesfully.",
    });
  }
);
app.use("/", routes);

app.post("/setresources", (res, req) => {
  deleteData();
  loadData();
});
app.listen(process.env.PORT, () => {
  console.log(`Server listening on PORT ${process.env.PORT}`);
});
