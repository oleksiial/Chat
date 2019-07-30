import React from 'react';
import { graphql } from 'react-apollo';
import { NEW_MESSAGE, GET_MESSAGES, SIGN_IN } from '../requests';
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

  if (!messages.find(m => m.id === newMessage.id)) {
    proxy.writeQuery({
      query: GET_MESSAGES,
      variables: { conversationId: convId },
      data: { messages: [...messages, newMessage] }
    });
  }
};

const update_SIGN_IN = (proxy, convId, newMessage) => {
  const { user } = proxy.readQuery({
    query: SIGN_IN,
    variables: { id: 1 }
  });

  const conversations = user.conversations.map(c =>
    c.id === convId ? { ...c, lastMessage: newMessage } : c
  );

  proxy.writeQuery({
    query: SIGN_IN,
    variables: { id: 1 },
    data: {
      user: {
        ...user,
        conversations
      }
    }
  });
};

export default graphql(NEW_MESSAGE, {
  options: props => ({
    update: (proxy, { data: { createMessage } }) => {
      update_GET_MESSAGES(proxy, props.conversationId, createMessage);
      update_SIGN_IN(proxy, props.conversationId, createMessage);
    }
  })
})(NewMessageInput);
