const express = require("express");
const config = require("./config");
const cors = require("cors");
const DeviceEventEmitter = require("./device-event-emitter");

const app = express();
const deviceEventEmitter = new DeviceEventEmitter();

app.use(express.json());
app.use(cors());

// Vehicle Command
app.post("/command", (req, res) => {
  const commandString = JSON.stringify(req.body);
  console.info("Sending command: ", commandString);
  deviceEventEmitter.emitCommand(commandString);

  res.json({ message: "Command sent" });
});

// Server Sent Events
app.get("/events/device", async function (req, res) {
  console.info("Device events requested from IP: ", req.socket.remoteAddress);
  res.set({
    "Cache-Control": "no-cache",
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
  });
  res.flushHeaders();

  deviceEventEmitter.on("command", (command) => {
    res.write(`data: ${command}\n\n`);
  });
});

app.listen(config.apiPort, () => {
  console.info("Listening on port: ", config.apiPort);
});
