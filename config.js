module.exports = {
  wsPort: process.env.WS_PORT || 8083,
  apiPort: process.env.API_PORT || 8082,
  wsHeartBeatRateMillisconds: process.env.WS_HEART_BEAT_RATE || 2000,
};
