const { createMessage } = require('./db/messages');
const { createRoom } = require('./db/conversations');
const { io } = require('./io');

function sendMessage(from, to, text) {
  createMessage(from, to, text);
  io.in(to).emit('message', { to, from, text });
  console.log(`send message from ${from} to ${to}: ${text}`);
}

function startConversation(socket, userId) {}

function joinRoom(socket, roomId) {
  socket.join(roomId);
  socket.emit('joined', roomId);
  sendMessage(roomId, roomId, socket.name + ' connected');
  console.log(`socket joined ${roomId}`);
}

exports.sendMessage = sendMessage;
exports.joinRoom = joinRoom;
exports.startConversation = startConversation;
