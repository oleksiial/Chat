import gql from 'graphql-tag';

export const fragmentConv = gql`
  fragment conversation on Conversation {
    id
    label
    type
    users {
      id
      username
    }
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
      users {
        id
        username
      }
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
        }
      }
    }
  }
`;

const fragmentAuthResponse = gql`
  fragment authResponse on AuthResponse {
      id
      isLoggedIn
      sid
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

export const SEARCH = gql`
  query getConversation($pattern: String!) {
    search(pattern: $pattern) {
      users {
        id
        username
      }
    }  
  }
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

export const START_CONVERSATION = gql`
  mutation startConversation($userId: ID!) {
    startConversation(userId: $userId) {
      ...conversation
    }
  }
  ${fragmentConv}
`;

export const NEW_CONVERSATION_SUBSCRIPTION = gql`
  subscription newConversation {
    newConversation {
      ...conversation
    }
  }
  ${fragmentConv}
`;

export const MESSAGE_SUBSCRIPTION = gql`
  subscription message {
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
