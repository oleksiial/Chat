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
  mutation createMessage($senderId: ID!, $conversationId: ID!, $text: String!) {
    createMessage(conversationId: $conversationId, senderId: $senderId, text: $text) {
      id
      text
      sender {
        id
        name
      }
    }
  }
`;

export const SIGN_IN = gql`
  mutation signIn($username: String!, $password: String!) {
    signIn(username: $username, password: $password)
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
    newMessage(conversationId: $conversationId) {
      id
      text
      user {
        id
      }
    }
  }
`;
