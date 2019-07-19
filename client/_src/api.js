import io from 'socket.io-client';

export const socket = io('http://localhost:3001');

export const selectRoom = id => {
  socket.emit('join', id);
};

export const sendMessage = (sender, message, currentRoom) => {
  socket.emit('message', { sender, conversation: currentRoom, text: message });
};
