const { Server } = require("socket.io");

const logger = require('./config/logger');
const eventEmitter = require('./utils/event');
const { chatService } = require('./services');

module.exports.initSocket = (server) => {
  const io = new Server(server, {path: '/socket'});
  io.on('connection', (socket) => {
    socket.userId = socket.handshake.auth.userId;
    logger.info(`a user connected`);

    socket.onAny((event, ...args) => {
      console.log(event, args);
    });

    eventEmitter.on('NewMessage', async (message) => {
      const chat = await chatService.getChatById(message.chatId);

      for (let [id, uSocket] of io.of('/').sockets) {
        if (uSocket.connected && chat.participants.includes(uSocket.userId)) {
          socket.to(id).emit('NewMessage', message)
        }
      }
    });
  });
}