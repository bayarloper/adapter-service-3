const http = require("http");
const url = require("url");

const PORT = 7070;

const server = http.createServer((req, res) => {
  const parsed = url.parse(req.url, true);
  const path = parsed.pathname;
  const q = parsed.query;

  res.setHeader("Content-Type", "text/html");

  if (path === "/") {
    res.end(`
      <html><body>
        <h2>Test App</h2>
        <ul>
          <li><a href="/search?q=hello">Search</a></li>
          <li><a href="/login">Login</a></li>
          <li><a href="/profile?id=1">Profile</a></li>
        </ul>
      </body></html>
    `);
  } else if (path === "/search") {
    // XSS vulnerability
    res.end(`<html><body><h3>Results for: ${q.q}</h3></body></html>`);
  } else if (path === "/login") {
    res.end(`
      <html><body>
        <form method="POST" action="/login">
          <input name="username" placeholder="username"/>
          <input name="password" type="password" placeholder="password"/>
          <button type="submit">Login</button>
        </form>
      </body></html>
    `);
  } else if (path === "/profile") {
    // SQL injection pattern
    res.end(`
      <html><body>
        <h3>User profile: ${q.id}</h3>
        <p>SELECT * FROM users WHERE id = ${q.id}</p>
      </body></html>
    `);
  } else {
    res.writeHead(404);
    res.end("<html><body>404 Not Found</body></html>");
  }
});

server.listen(PORT, () => {
  console.log(`Test app running at http://localhost:${PORT}`);
});
