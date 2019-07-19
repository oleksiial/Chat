import gql from 'graphql-tag';

export const GET_MESSAGES = gql`
  query getMessages($conversationId: ID!) {
    messages(conversationId: $conversationId) {
      id
      sender {
        id
      }
      text
    }
  }
`;

export const SEND_MESSAGE = gql`
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

export const GET_USER = gql`
  query getUser {
    user(id: 1) {
      id
      name
      conversations {
        id
        label
        type
        lastMessage {
          id
          text
          sender {
            id
            name
          }
        }
      }
    }
  }
`;
