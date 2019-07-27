const express = require('express');
const cookieParser = require('cookie-parser');
const { createServer } = require('http');
const { ApolloServer } = require('apollo-server-express');

const { resolvers } = require('./resolvers.js');
const { typeDefs } = require('./schema.gql');

const { exchangeSessionId } = require('./api/auth');

const PORT = process.env.PORT || 4000;
const app = express();
app.use(cookieParser());

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req, res, connection }) => {
    const sessionId = req ? req.cookies.sid : connection.context.sid;
    let currentUser = null;
    if (sessionId) {
      try {
        currentUser = await exchangeSessionId(sessionId);
      } catch (e) {
        console.warn(`Unable to authenticate using session id: ${sessionId}`, e.message);
      }
    }

    return {
      sessionId,
      currentUser,
      res
    };
  },
  subscriptions: {
    onConnect: (connectionParams, webSocket) => {
      const sid = webSocket.upgradeReq.headers.cookie.substring(4);
      return { sid };
    }
  }
});
apolloServer.applyMiddleware({ app });

const httpServer = createServer(app);
apolloServer.installSubscriptionHandlers(httpServer);

httpServer.listen({ port: PORT }, () => {
  console.log(`Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`);
  console.log(`Subscriptions ready at ws://localhost:${PORT}${apolloServer.subscriptionsPath}`);
});
