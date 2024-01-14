const express = require("express");
const app = express();
const httpServer = require("http").createServer(app);
const WebSocket = require("ws");
const PORT = 3001;

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

const wss = new WebSocket.Server({ server: httpServer });

wss.broadcast = (data) => {
  wss.clients.forEach((client) => {
    client.send(data);
  });
};

wss.on("connection", (ws) => {
  console.log("WebSocket connection established");
  const visitorsCount = wss.clients.size;

  ws.readyState === ws.OPEN && ws.send("Welcome to the server");

  wss.broadcast(visitorsCount);

  ws.on("close", () => {
    console.log("A client has disconnected");
  });
});

httpServer.listen(PORT, () => {
  console.log("Server started listening on port 3001");
});
