const { WebSocketServer } = require("ws");
const config = require("./config");

function init(server) {
  const wss = new WebSocketServer({ server });

  let connected = false;

  wss.on("connection", (ws, req) => {
    console.info("Connected to IP: ", req.socket.remoteAddress);
    connected = true;
  });

  wss.on("close", () => {
    console.warn("Connection closed");
  });

  return wss;
}

module.exports = init;
