const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();
const nodemailer = require("nodemailer");
require("dotenv").config();
app.use(express.json());
var corsOption = {
  origin: "http://localhost:3000",
  optionSuccessStatus: 200,
};
app.use(cors(corsOption));
var mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_demo",
  multipleStatements: true,
});

app.post("/createuser", (req, res) => {
  let data = req.body;
  console.log(data);
  mysqlConnection.query(
    `INSERT INTO user(name, email, budget, isactive) VALUES (?,?,?,1);`,
    [data.name, data.email, data.budget],
    (error, rows) => {
      if (rows) {
        res.status(200).json({ data: rows });
      } else {
        console.log("error");
      }
    }
  );
});
app.get("/getlist", (req, res) => {
  mysqlConnection.query(
    "select * from user where isactive =1",
    (error, rows) => {
      if (rows) {
        res.status(200).send(rows);
      } else {
        console.log("error");
      }
    }
  );
});

app.get("/getlist/:id", (req, res) => {
  let data = req.params.id;
  console.log(data);
  mysqlConnection.query(
    "select * from user where isactive =1 and id =?",
    [data],
    (error, rows) => {
      if (rows) {
        res.status(200).send(rows[0]);
      } else {
        console.log("error");
      }
    }
  );
});

app.post("/sendmail", (req, res) => {
  let data = req.body;
  console.log("envoked");
  console.log(data);
  var mail = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.mailid,
      pass: process.env.password,
    },
  });
  var mailOption = {
    from: "jayj10137@gmail.com",
    to: data.email,
    subject: "sending demo mail",
    text: `hello ${data.enteredtext}`,
  };
  mail.sendMail(mailOption, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent" + info.response);
    }
  });
});
app.post("/getentredtedt", (req, res) => {
  let data = req.body;
  console.log(data);
  mysqlConnection.query(
    "INSERT INTO other(name, message, isactive) VALUES (?,?,1);",
    [data.name, data.message],
    (err, rows) => {
      if (rows) {
        res.status(200).send(rows);
        console.log(rows);
      } else {
        console.log(err);
      }
    }
  );
});

app.put("/updateById", (req, res) => {
  let data = req.body;

  mysqlConnection.query(
    "UPDATE `user` SET `name`=?,`email`=?,`budget`=? WHERE isactive=1 and id=?;",
    [data.name, data.email, data.budget, data.id],
    (error, rows) => {
      if (rows) {
        console.log(rows);
        res.status(200).json({ data: rows });
      } else {
        console.log(error);
      }
    }
  );
});

app.put("/deletebyId/:id", (req, res) => {
  let data = req.params.id;
  console.log(data);
  mysqlConnection.query(
    "UPDATE `user` SET isactive=0 WHERE id=?;",
    [data],
    (error, rows) => {
      if (rows) {
        console.log(rows);
        res.status(200).json({ data: rows });
      } else {
        console.log(error);
      }
    }
  );
});

app.listen(9000, () => {
  console.log("server running");
});
