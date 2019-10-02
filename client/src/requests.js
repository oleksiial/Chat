import gql from 'graphql-tag';

export const fragmentConv = gql`
  fragment conversation on Conversation {
    id
    label
    type
    messages {
      id
      text
      user {
        id
      }
    }
    lastMessage {
      id
      text
      user {
        id
      }
    }
  }
`;

export const fragmentUser = gql`
  fragment user on User {
    id
    username
    conversations {
      id
      label
      type
      messages @client {
        id
        text
        user {
          id
        }
      }
      lastMessage {
        id
        text
        user {
          id
          username
        }
      }
    }
  }
`;

const fragmentAuthResponse = gql`
  fragment authResponse on AuthResponse {
      id
      isLoggedIn
      user {
        ...user
      }
  }
  ${fragmentUser}
`;

export const GET_CONVERSATION = gql`
  query getConversation($conversationId: ID!) {
    conversation(conversationId: $conversationId) {
      ...conversation
    }  
  }
  ${fragmentConv}
`;

export const NEW_MESSAGE = gql`
  mutation sendMessage($conversationId: ID!, $text: String!) {
    sendMessage(conversationId: $conversationId, text: $text) {
      id
      text
      user {
        id
      }
      conversation {
        id
      }
    }
  }
`;

export const AUTH_DATA = gql`
  query authData {
    authData {
      ...authResponse
    }
  }
  ${fragmentAuthResponse}
`;

export const SIGN_IN = gql`
  mutation signIn($username: String!, $password: String!) {
    signIn(username: $username, password: $password) {
      ...authResponse
    }
  }
  ${fragmentAuthResponse}
`;

export const SIGN_UP = gql`
  mutation signUp($username: String!, $password: String!, $passwordConfirmation: String!) {
    signUp(username: $username, password: $password, passwordConfirmation: $passwordConfirmation) {
      ...authResponse
    }
  }
  ${fragmentAuthResponse}
`;

export const SIGN_OUT = gql`
  mutation signOut {
    signOut {
      ...authResponse
    }
  }
  ${fragmentAuthResponse}
`;

export const MESSAGE_SUBSCRIPTION = gql`
  subscription {
    message {
      id
      text
      user {
        id
      }
      conversation {
        id
      }
    }
  }
`;
