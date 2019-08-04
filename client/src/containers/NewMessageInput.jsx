import React from 'react';
import { graphql } from 'react-apollo';
import { NEW_MESSAGE, GET_MESSAGES, GET_ME } from '../requests';
import '../components/styles.css';

const NewMessageInput = ({ mutate, conversationId }) => {
  let input = null;
  const handleClick = () => {
    mutate({ variables: { text: input.value, conversationId } });
    input.value = '';
  };

  return (
    <div className="messageInput">
      <input type="text" ref={e => (input = e)} />
      <button onClick={handleClick}>Send</button>
    </div>
  );
};

const update_GET_MESSAGES = (proxy, conversationId, newMessage) => {
  const { messages } = proxy.readQuery({
    query: GET_MESSAGES,
    variables: { conversationId }
  });

  if (!messages.find(m => m.id === newMessage.id)) {
    proxy.writeQuery({
      query: GET_MESSAGES,
      variables: { conversationId },
      data: { messages: [...messages, newMessage] }
    });
  }
};

const update_SIGN_IN = (proxy, convId, newMessage) => {
  const { me } = proxy.readQuery({
    query: GET_ME
  });

  const conversations = me.conversations.map(c =>
    c.id === convId ? { ...c, lastMessage: newMessage } : c
  );

  proxy.writeQuery({
    query: GET_ME,
    data: {
      me: {
        ...me,
        conversations
      }
    }
  });
};

export default graphql(NEW_MESSAGE, {
  options: props => ({
    update: (proxy, { data: { sendMessage } }) => {
      update_GET_MESSAGES(proxy, props.conversationId, sendMessage);
      update_SIGN_IN(proxy, props.conversationId, sendMessage);
    }
  })
})(NewMessageInput);
