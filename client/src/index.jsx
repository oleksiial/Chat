import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';

import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { ApolloProvider } from '@apollo/react-hooks';

import { ApolloLink, split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

import * as serviceWorker from './serviceWorker';
import App from './containers/App';
import { fragmentUser, AUTH_DATA, fragmentConv } from './requests';

// Create an http link:
const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include',
});

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000/graphql',
  options: {
    reconnect: true,
  },
});

const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition'
      && definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);
const cache = new InMemoryCache();
const client = new ApolloClient({
  resolvers: {
    Mutation: {
      createFakeConversation: (_, { selectedUser }, { client: apolloClient }) => {
        const newConversation = {
          id: -1,
          label: selectedUser.username,
          type: 'private',
          messages: [],
          lastMessage: null,
          users: [selectedUser],
          __typename: 'Conversation',
        };

        const { authData } = apolloClient.readQuery({ query: AUTH_DATA });
        apolloClient.writeQuery({
          query: AUTH_DATA,
          data: {
            authData: {
              ...authData,
              user: {
                ...authData.user,
                conversations: [
                  ...authData.user.conversations.filter((conv) => conv.id !== -1),
                  newConversation,
                ],
              },
            },
          },
        });

        return newConversation;
      },
    },
    Query: {
      search: ({ search: { users } }, { pattern }) => {
        const { authData: { user: { conversations } } } = client.readQuery({ query: AUTH_DATA });
        const filteredConversations = conversations.filter((conv) => conv.label.includes(pattern));
        const filteredUsers = users.filter(
          (user) => !conversations.find((conv) => conv.label === user.username),
        );
        return { conversations: filteredConversations, filteredUsers };
      },
    },
    Conversation: {
      label: (obj) => obj.users[obj.users.length - 1].username,
      messages: (obj) => (obj.lastMessage === null ? [] : [obj.lastMessage]),
    },
  },
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.forEach(({ message, locations, path }) => console.log(
          `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(locations)}, Path: ${path}`,
        ));
      }
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    link,
  ]),
  cache,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>, document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
