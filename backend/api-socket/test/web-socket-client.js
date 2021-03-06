const WebSocket = require('ws');
var webSocket = new WebSocket('ws://0.0.0.0:5002');

webSocket.onopen = function (e) {
  console.log('webSocket server connect success');
};

webSocket.onmessage = function (event) {
  console.log(`receiver server data: ${event.data}`);
};

webSocket.onclose = function (e) {
  console.log('webSocket server connect closed.');
};
