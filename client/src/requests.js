import gql from 'graphql-tag';

export const VALIDATE_SESSION = gql`
  query validate {
    validate
  }
`;

export const GET_MESSAGES = gql`
  query getMessages($conversationId: ID!) {
    messages(conversationId: $conversationId) {
      id
      user {
        id
      }
      text
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
        username
      }
    }
  }
`;

export const SIGN_IN = gql`
  mutation signIn($username: String!, $password: String!) {
    signIn(username: $username, password: $password)
  }
`;

export const SIGN_OUT = gql`
  mutation signOut {
    signOut
  }
`;

export const GET_ME = gql`
  query getUser {
    me {
      id
      username
      conversations {
        id
        label
        type
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
  }
`;

export const MESSAGE_SUBSCRIPTION = gql`
  subscription($conversationId: ID!) {
    message(conversationId: $conversationId) {
      id
      text
      user {
        id
        username
      }
    }
  }
`;
