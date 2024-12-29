const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const session = require('express-session'); 
const fs = require("fs");
const mysql = require("mysql");

const app = express();
const port = 8080;

//create/initalize connection to database
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Computergeek27!", // Use your MySQL root password
    database: "personalwebsite", // Use your database
  });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.static("downloads"));
app.use(express.json());

app.use(
    session({
      secret: "your-secret-key",
      resave: false,
      saveUninitialized: false,
    })
  );

  //this function reads the html files for each webpage and executes it accordingly
  function readAndServe(path, res) {
    fs.readFile(path, function (err, data) {
      if (err) {
        res.status(500).send("Error reading file.");
        return;
      }
      res.setHeader("Content-Type", "text/html");
      res.end(data);
    });
  }
// Route for homepage (main.html)
app.get("/", function (req, res) {
    readAndServe("./index.html", res);
  });
//Route for about me page (aboutme.html)
app.get("/aboutme", function (req, res)
{
    readAndServe("./aboutme.html", res);
});
app.get("/resume", function (req, res)
{
    readAndServe("./resume.html", res)
 });
 app.get("/contact", function(req, res)
 {
    readAndServe("./contact.html", res)
 });
 app.get("/myprojects", function (req, res)
 {
    readAndServe("./MyProjects.html", res);
 });
 app.get("/privacy-policy", function (req, res)
 {
    res.send("Blah Blah Blah!");
 });

 app.post("/api/contact", (req, res) => {
    const {firstName, lastName, email, Message} = req.body;
    if(!firstName)
        return res.status(400).send("Missing First Name");
    if(!lastName)
        return res.status(400).send("Missing Last Name");
    if(!email)
        return res.status(400).send("Missing email address");
    if(!Message)
        return res.status(400).send("Missing message");
    if(Message.length > 10) 
        return res.status(400).send("Message cannot exceed 500 characters");
    
    var sql_query = "insert into contactData(firstName, lastName, email, Message) VALUES (?, ?, ?, ?)";

    con.query(sql_query, [firstName, lastName, email, Message], (err) => {
        if (err) {
          console.error("Error saving account:", err);
          return res.status(500).send("Error saving account");
        }});
    res.send("Thank you. Your response has been recorded and sent to Sean. + \n + Please hit the left arrow button to go back to the previous page");
});

app.listen(port, "0.0.0.0", function () {
  console.log("NodeJS app listening on https://computercoder125.github.io/Portfolio-Website/main");
});
