const zmq = require('zeromq');
const activeClients = require('./webSocketServer').clients;

async function zmqSubscription() {
  const sock = new zmq.Subscriber();

  sock.connect('tcp://167.172.134.157:29000');
  sock.subscribe('rawblock');
  console.log('bitcoin zmq subscriber connected to port 29000');

  for await (const [topic, msg] of sock) {
    console.log('block received');
    for (let i = 0; i < Object.keys(activeClients); ++i) {
      let connection = activeClients[i];
      connection.sendUTF('hello');
    }
  }
}

module.exports = zmqSubscription;
