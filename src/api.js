const express = require("express");
const app = express();

app.get("/user", (req, res) => {
  const id = req.query.id;
  const html = "<h1>User: " + id + "</h1>";
  res.send(html);
});

app.get("/eval", (req, res) => {
  const code = req.query.code;
  eval(code);
  res.send("done");
});

app.post("/upload", (req, res) => {
  const filename = req.body.filename;
  const path = "/uploads/" + filename;
  const fs = require("fs");
  fs.readFileSync(path);
});

function parseXml(data) {
  const parser = require("xml2js");
  return parser.parseString(data);
}

app.listen(3000);
module.exports = app;
