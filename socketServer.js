const http = require('http');
const IO = require('socket.io');

export default function Socket(app) {
  const server = http.createServer(app.callback());
  const io = IO(server);

  io.on('connection', (so) => {
    so.on('receive', (msg) => {
      console.log('message: ', msg);
      io.emit('receive', msg);
    });

    so.on('disconnect', () => {
      console.log('disconnected');
    })
  });
  return server;
}