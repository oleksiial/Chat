const express = require('express');
const { createServer } = require('http');
const { ApolloServer } = require('apollo-server-express');

const { resolvers } = require('./resolvers.js');
const { typeDefs } = require('./schema.gql');

const PORT = process.env.PORT || 4000;

const app = express();

const apolloServer = new ApolloServer({ typeDefs, resolvers });
apolloServer.applyMiddleware({ app });

const httpServer = createServer(app);
apolloServer.installSubscriptionHandlers(httpServer);

httpServer.listen({ port: PORT }, () => {
  console.log(`Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`);
  console.log(`Subscriptions ready at ws://localhost:${PORT}${apolloServer.subscriptionsPath}`);
});

// async function sendMessage(sender, conversation, text) {
//   const message = await createMessage(sender, conversation, text);
//   io.in(conversation).emit('message', { id: message.id, sender, conversation, text });
//   console.log(`send message from ${sender} to ${conversation}: ${text}`);
// }

// let id = 0;
// io.on('connection', socket => {
//   socket.userId = ++id;
//   getConversationsByUserId(socket.userId).then(res => res.forEach(conv => socket.join(conv.id)));

//   socket.emit('id', socket.userId);
//   socket.on('disconnect', () => console.log(socket.userId + ' disconnected'));
//   socket.on('message', m => sendMessage(m.sender, m.conversation, m.text));
//   // socket.on('join', roomId => joinRoom(socket, roomId));
//   console.log(socket.userId + ' connected');
// });
