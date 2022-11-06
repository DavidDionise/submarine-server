const express = require("express");
const config = require("./config");
const initWss = require("./ws-server");
const cors = require("cors");
const http = require("http");

const app = express();

app.use(express.json());
app.use(cors());

const server = http.createServer(app);

const wss = initWss(server);

// Vehicle Command
app.post("/command", (req, res) => {
  wss.clients.forEach((ws) => {
    ws.send(JSON.stringify(req.body));
  });

  res.json({ message: "Command sent" });
});

// Server Sent Events
app.get("/events", async function (req, res) {
  console.log("Got /events");
  res.set({
    "Cache-Control": "no-cache",
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
  });
  res.flushHeaders();

  // Tell the client to retry every 10 seconds if connectivity is lost
  res.write("retry: 10000\n\n");
  let count = 0;

  while (true) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Emit", ++count);
    // Emit an SSE that contains the current 'count' as a string
    res.write(`data: ${count}\n\n`);
  }
});

server.listen(config.apiPort, () => {
  console.info("Listening on port: ", config.apiPort);
});
