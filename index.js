const http = require("http");
const fs = require("fs");

const server = http.createServer();

server.on("request", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write("<h1>Hello from my Node blog :)</h1>");
  res.end();
});

server.listen(3001);

console.log("Server started listening on port 3001");
