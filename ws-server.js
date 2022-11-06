const { WebSocketServer } = require("ws");
const config = require("./config");

const wss = new WebSocketServer({ port: config.wsPort });

let connected = false;

wss.on("connection", (ws, req) => {
  console.info("Connected to IP: ", req.socket.remoteAddress);
  connected = true;
});

wss.on("close", () => {
  console.warn("Connection closed");
});

module.exports = wss;
