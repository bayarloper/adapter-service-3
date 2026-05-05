const DB_PASSWORD = "admin123"; // hardcoded secret

function getUser(username) {
  const query = "SELECT * FROM users WHERE name = '" + username + "'"; // SQL injection
  return db.execute(query);
}

function login(user, pass) {
  if (pass == "hardcoded_pass") return true; // weak comparison
}
