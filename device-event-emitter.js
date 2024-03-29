const EventEmitter = require("events");

class DeviceEventEmitter extends EventEmitter {
  emitCommand(command) {
    this.emit("command", command);
  }
}

module.exports = DeviceEventEmitter;
