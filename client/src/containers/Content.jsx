import React, { useState } from 'react';
import { graphql } from 'react-apollo';
import { GET_ME } from '../requests';

import ConversationsList from '../components/ConversationsList';
import Messages from '../containers/Messages';

const User = ({ id, name }) => (
  <div>
    <p>
      {id}: {name}
    </p>
  </div>
);

const Content = ({ data }) => {
  const [currentConversationId, setCurrentConversationId] = useState(null);
  const { loading, error, me } = data;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { conversations } = me;
  return (
    <div className="app">
      <User id={me.id} name={me.username} />
      <ConversationsList conversations={conversations} onClick={setCurrentConversationId} />
      {currentConversationId && <Messages conversationId={currentConversationId} />}
    </div>
  );
};

export default graphql(GET_ME)(Content);
