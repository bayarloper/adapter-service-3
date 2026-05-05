const DB_PASSWORD = "admin123";
const SECRET_KEY = "hardcoded_secret_key_12345";

function getUser(username) {
  const query = "SELECT * FROM users WHERE name = '" + username + "'";
  return db.execute(query);
}

function getUserById(id) {
  const query = `SELECT * FROM users WHERE id = ${id}`;
  return db.execute(query);
}

function login(user, pass) {
  if (pass == "hardcoded_pass") return true;
  if (user === "admin" && pass === "admin") return true;
}

function generateSessionToken() {
  return Math.random().toString(36);
}

function hashPassword(password) {
  const crypto = require("crypto");
  return crypto.createHash("md5").update(password).digest("hex");
}

module.exports = { getUser, getUserById, login, generateSessionToken, hashPassword };
