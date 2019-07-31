import React from 'react';
import { graphql } from 'react-apollo';

import { GET_MESSAGES } from '../requests';
import Message from '../components/Message';
import NewMessageInput from './NewMessageInput';

const Messages = ({ conversationId, data }) => {
  const { loading, error, messages } = data;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="messages">
      {messages.map(m => (
        <Message key={m.id} id={m.id} text={m.text} user={m.user} />
      ))}
      <NewMessageInput senderId={1} conversationId={conversationId} />
    </div>
  );
};

export default graphql(GET_MESSAGES, {
  options: props => ({ variables: { conversationId: props.conversationId } })
})(Messages);
