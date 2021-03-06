const { async, asyncScheduler } = require("rxjs");
const { client, pool } = require("../Database/database");
const fastcsv = require("fast-csv");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const privateKey = "saheel";
class UserManagement {
  func = (res, req) => {
    return new Promise((resolve, reject) => {
      console.log("func", req.body);
      let { email, password } = req.body;
      if (email && password) {
        //check if user exists in db
        console.log("func checking for user..", email);

        const query1 = "Select username from users where email=$1";

        client.query(query1, [email], (err, rese) => {
          if (err) {
            console.log(err.stack);
            reject({ errorCode: 102, message: "Unknown exception" });
          } else {
            if (rese.rowCount == 0) {
              console.log("No such user found");
              reject({ errorCode: 101, message: "No such user found" });
            } else {
              console.log("Checkpost 1 cleared");
              resolve();
            }
          }
        });
      }
    });
  };

  register = (req, res) => {
    let { username, password } = req.body;
    if (username && password) {
      //check if user already exists in db

      let hashed_password = bcrypt.hashSync(password, 12);
      let user = {
        username: username,
        password: hashed_password,
      };
      console.log(hashed_password);
      res.status(200).json({ user });
    } else {
      res.json({ message: "Username and password not entered correctly" });
    }
  };

  passwordCheck = (email, password) => {
    return new Promise((resolve, reject) => {
      let hash = "";

      let result = [];
      console.log("Checking for passwords");
      const query = "Select * from users where email=$1";

      client.query(query, [email], (err, rese) => {
        if (err) {
          console.log(err.stack);
          reject({ errorCode: 102, message: "Unknown Exception" });
        } else {
          result = rese.rows;
          hash = result[0].password;
          // console.log("inputing hashhh", hash);
          let check = bcrypt.compareSync(password, hash);
          console.log("Checking  ", check);
          if (check) {
            let token = jwt.sign(
              { email: email, user: result[0].username, role: result[0].role },
              privateKey
            );
            console.log("Checkpost 2 cleared");
            console.log("token", token);
            return resolve(token);
          } else reject("");
        }
      });
    });
  };

  login = async (req, res) => {
    let { email, password } = req.body;
    console.log(email, password);
    if (email && password) {
      //check if user exists in db

      this.func(res, req).then(
        () => {
          this.passwordCheck(req.body.email, req.body.password).then(
            (token) => {
              console.log("password resolve");
              if (token) {
                res.json({ token });
              } else {
                res.json({ message: "Password incorrect" });
              }
            },
            () => {
              console.log("password reject");
              res.json({ message: "Incorrect Password" });
            }
          );
        },
        (data) => {
          console.log("reject", data);
          return res.json({ message: "Email doesn't exist" });
        }
      );
    } else {
      res.json({ message: "Invalid Email or password" });
    }
  };

  verifyToken = (req, res) => {
    let token = req.body;
    if (token) {
      jwt.verify(token.toString(), privateKey, (err, data) => {
        if (err) {
          return res.status(401).json({ message: err });
        } else {
          return res.status(200).json({ message: data });
        }
      });
    }
  };
  getAllUsers = async (req, res) => {
    let query = "Select * from users";
    let users = await client.query(query, (error, data) => {
      if (error) {
        console.log("error", error);
        res.json({
          errorCode: 201,
          message: "Error in fetching the Users",
        });
      } else {
        console.log("projects", data.rows);
        res.json(data.rows);
      }
    });
    console.log("logging results..");
  };

  addUser = async (req, res) => {
    let { username, email, password, role } = req.body;
    console.log(username, email, password, role);

    let hashed_password = bcrypt.hashSync(password, 12);
    const newuser = await pool.query(
      "insert into users(username, email,password, role) values($1,$2,$3,$4) Returning *",
      [username, email, hashed_password, role]
    );
    console.log("new user", newuser.rows[0]);
    res.json({
      message: "User added successfully",
      data: newuser.rows[0],
    });
  };

  uploadBulkUsers = (res, req) => {};

  deleteUser = async (req, res) => {
    let { id } = req.body;
    const result = await pool.query("DELETE from users where id=$1", [id]);
    console.log("deleting user with id", id, result);
    res.sendStatus(200);
  };
  updateUser = async (req, res) => {};
}

module.exports = UserManagement;
