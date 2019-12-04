const webSocketServer = require('websocket').server;
const http = require('http');
const getUniqueID = require('./utils');

const socket = http.createServer();

const wsServer = new webSocketServer({
  httpServer: socket
});

// active clients
const clients = {};

wsServer.on('request', request => {
  let userID = getUniqueID();
  console.log(
    new Date() +
      ' Recieved a new connection from origin ' +
      request.origin +
      '.'
  );

  const connection = request.accept(null, request.origin);
  clients[userID] = connection;
  console.log(
    'connected: ' + userID + ' in ' + Object.getOwnPropertyNames(clients)
  );

  // connection.on('message', message => {
  //   console.log('message from client');
  //   console.log(message);
  // });

  connection.on('close', () => {
    console.log(new Date() + ' Peer ' + userID + ' disconnected.');
    delete clients[userID];
  });
});

module.exports = { socket, clients };
