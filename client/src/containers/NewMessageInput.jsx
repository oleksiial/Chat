import React from 'react';
import { graphql } from 'react-apollo';
import { SEND_MESSAGE, GET_MESSAGES, GET_USER } from '../requests';
import '../components/styles.css';

const NewMessageInput = ({ mutate, senderId, conversationId }) => {
  let input = null;
  const handleClick = () => {
    mutate({ variables: { text: input.value, senderId, conversationId } });
    input.value = '';
  };

  return (
    <div className="messageinput">
      <input type="text" ref={e => (input = e)} />
      <button onClick={handleClick}>Send</button>
    </div>
  );
};

const update_GET_MESSAGES = (proxy, convId, newMessage) => {
  const { messages } = proxy.readQuery({
    query: GET_MESSAGES,
    variables: { conversationId: convId }
  });
  proxy.writeQuery({
    query: GET_MESSAGES,
    variables: { conversationId: convId },
    data: { messages: [...messages, newMessage] }
  });
};

const update_GET_USER = (proxy, convId, newMessage) => {
  const { user } = proxy.readQuery({
    query: GET_USER,
    variables: { id: 1 }
  });

  const conversations = user.conversations.map(c =>
    c.id === convId ? { ...c, lastMessage: newMessage } : c
  );

  proxy.writeQuery({
    query: GET_USER,
    variables: { id: 1 },
    data: {
      user: {
        ...user,
        conversations
      }
    }
  });
};

export default graphql(SEND_MESSAGE, {
  options: props => ({
    update: (proxy, { data: { createMessage } }) => {
      update_GET_MESSAGES(proxy, props.conversationId, createMessage);
      update_GET_USER(proxy, props.conversationId, createMessage);
    }
  })
})(NewMessageInput);
