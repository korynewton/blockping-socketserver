const socket = require('./webSocketServer');

const PORT = process.env.PORT || 8000;

socket.listen(PORT, () => {
  console.log('up and running on port 8000');
});
