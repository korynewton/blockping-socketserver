const zmq = require('zeromq');

async function zmqSubscription() {
  const sock = new zmq.Subscriber();

  sock.connect('tcp://127.0.0.1:29000');
  sock.subscribe('block');
  console.log('bitcoin zmq subscriber connected to port 29000');

  for await (const [topic, msg] of sock) {
    console.log(
      'received a message related to:',
      topic.toString('hex'),
      'containing message:',
      message.toString('hex')
    );
  }
}

module.exports = zmqSubscription;
