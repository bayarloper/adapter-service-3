const express = require("express");
const app = express();
const fs = require("fs");
const { exec } = require("child_process");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ❌ 1. SQL Injection (Critical)
app.get("/login", (req, res) => {
  const user = req.query.user;
  const pass = req.query.pass;

  const query = "SELECT * FROM users WHERE username = '" + user + "' AND password = '" + pass + "'";
  console.log(query);

  res.send("Logged in (maybe)");
});

// ❌ 2. Command Injection (Critical)
app.get("/ping", (req, res) => {
  const host = req.query.host;
  exec("ping -c 1 " + host, (err, stdout) => {
    res.send(stdout);
  });
});

// ❌ 3. Path Traversal (High)
app.get("/file", (req, res) => {
  const filename = req.query.name;
  const data = fs.readFileSync("/var/www/files/" + filename);
  res.send(data);
});

// ❌ 4. Insecure eval (Critical)
app.get("/run", (req, res) => {
  const code = req.query.code;
  eval(code);
  res.send("executed");
});

// ❌ 5. Hardcoded secret (High)
const API_KEY = "12345-SECRET-KEY";

// ❌ 6. Weak crypto (High)
const crypto = require("crypto");
app.get("/hash", (req, res) => {
  const data = req.query.data;
  const hash = crypto.createHash("md5").update(data).digest("hex");
  res.send(hash);
});

// ❌ 7. Insecure deserialization (Critical)
app.post("/deserialize", (req, res) => {
  const obj = JSON.parse(req.body.data);
  res.send(obj);
});

// ❌ 8. XSS (High)
app.get("/profile", (req, res) => {
  const name = req.query.name;
  res.send("<h1>Hello " + name + "</h1>");
});

// ❌ 9. Open Redirect (High)
app.get("/redirect", (req, res) => {
  const url = req.query.url;
  res.redirect(url);
});

// ❌ 10. Missing authentication (Critical)
app.get("/admin", (req, res) => {
  res.send("Sensitive admin data");
});

// ❌ 11. XML External Entity (XXE) (Critical)
const xml2js = require("xml2js");
app.post("/xml", (req, res) => {
  xml2js.parseString(req.body.xml, (err, result) => {
    res.send(result);
  });
});

// ❌ 12. Insecure file upload (High)
app.post("/upload", (req, res) => {
  const file = req.body.filename;
  fs.writeFileSync("/uploads/" + file, "data");
  res.send("uploaded");
});

// ❌ 13. Prototype Pollution (High)
app.post("/merge", (req, res) => {
  const obj = {};
  Object.assign(obj, req.body);
  res.send(obj);
});

app.listen(3000, () => {
  console.log("Vulnerable app running on port 3000");
});

module.exports = app;
