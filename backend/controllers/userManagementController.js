const bcrypt = require("bcrypt");
const { reject } = require("bcrypt/promises");
const { response } = require("express");
const jwt = require("jsonwebtoken");
const { user } = require("pg/lib/defaults");
const { fetchPassword } = require("../database");
const Pool = require("pg").Pool;
const privateKey = "saheel";
const client = require("../Database/database");
// const loginFunc = new Promise((resolve, reject) => {});

class userManagement {
  func = (res, req) => {
    return new Promise((resolve, reject) => {
      console.log(req.body);
      let { email, password } = req.body;
      if (email && password) {
        //check if user exists in db
        console.log("checking for user..", email);

        const query1 = "Select username from users where username=$1";

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
  // checkForUser = async (username, password) =>
  //   new Promise((resolve, reject) => {
  //     if (username && password) {
  //       console.log("checking for user..");
  //       const pool = new Pool({
  //         host: "localhost",
  //         user: "postgres",
  //         database: "motorola",
  //         password: "root",
  //         port: 5432,
  //       });
  //       // let userExists = true;
  //       const query1 = "Select username from users where username=$1";
  //       pool.connect(async (err, client, done) => {
  //         if (err) throw err;
  //         // try {
  //         await client.query(query1, [username], (err, rese) => {
  //           if (err) {
  //             console.log(err.stack);
  //           } else {
  //             // console.log(rese.rowCount);
  //             if (rese.rowCount == 0) {
  //               console.log("No such user found");
  //               reject({ errorCode: 101, message: "No such user found" });
  //               // userExists = false;
  //               return;
  //             } else {
  //               console.log("Checkpost 1 cleared");
  //               resolve("User exists");
  //               this.checkForPassword(username, password).then((res) =>
  //                 resolve(res)
  //               );
  //             }
  //           }
  //         });
  //         // } finally {
  //         //   done();
  //         // }
  //       });
  //     } else reject("Username and Password not received");
  //   });

  // checkForPassword = async (username, password) =>
  //   new Promise((resolve, reject) => {
  //     let hash = "";

  //     let hashed_pass = [];

  //     console.log("Checking for passwords");
  //     const query = "Select password from users where username=$1";
  //     pool.connect(async (err, client, done) => {
  //       if (err) {
  //         throw err;
  //         reject(err);
  //       }
  //       try {
  //         await client.query(query, [username], (err, rese) => {
  //           if (err) {
  //             console.log(err.stack);
  //           } else {
  //             hashed_pass = rese.rows;
  //             hash = hashed_pass[0].password;
  //             // console.log("inputing hashhh", hash);
  //             let check = bcrypt.compareSync(password, hash);
  //             // console.log("Checking  ", check);
  //             if (check) {
  //               let token = jwt.sign({ username: username }, privateKey, {
  //                 expiresIn: "5s",
  //               });
  //               console.log("Checkpost 2 cleared");

  //               resolve({ token: token });
  //             } else return res.json("error");
  //           }
  //         });
  //       } finally {
  //         done();
  //       }
  //     });
  //   });

  // login = (req, res) => {
  //   res.json(await this.checkForUser(req.body.username, req.body.password));
  // };

  passwordCheck = (email, password) => {
    return new Promise((resolve, reject) => {
      let hash = "";

      let hashed_pass = [];
      console.log("Checking for passwords");
      const query = "Select password from users where username=$1";

      client.query(query, [email], (err, rese) => {
        if (err) {
          console.log(err.stack);
          reject({ errorCode: 102, message: "Unknown Exception" });
        } else {
          hashed_pass = rese.rows;
          hash = hashed_pass[0].password;
          // console.log("inputing hashhh", hash);
          let check = bcrypt.compareSync(password, hash);
          // console.log("Checking  ", check);
          if (check) {
            let token = jwt.sign({ email: email }, privateKey, {
              expiresIn: "5s",
            });
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
        () => {
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
}
module.exports = userManagement;
