const { WebSocketServer } = require("ws");
const config = require("./config");

function init(server) {
  const wss = new WebSocketServer({ server });

  let connected = false;
  let conCount = 0;

  wss.on("connection", (ws, req) => {
    console.info("Connected to IP: ", req.socket.remoteAddress);
    connected = true;
    let hearBeatTimerId;

    setInterval(function () {
      hearBeatTimerId = setTimeout(() => {
        console.warn("Terminating");
        ws.terminate();
        clearInterval(this);
      }, 10000);
      ws.ping();
    }, 3000);

    ws.on("pong", () => {
      clearTimeout(hearBeatTimerId);
      console.info("received pong: ", conCount++);
    });
  });

  wss.on("close", () => {
    console.warn("Connection closed");
  });

  return wss;
}

module.exports = init;
