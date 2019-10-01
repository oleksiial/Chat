import './Root.css';

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSubscription } from '@apollo/react-hooks';
import ConversationsList from '../../components/ConversationsList/ConversationsList';
import ConversationContainer from '../../containers/ConversationContainer';
import { MESSAGE_SUBSCRIPTION, fragmentConv } from '../../requests';

const Root = ({ user }) => {
  const [currentConversationId, setCurrentConversationId] = useState(null);

  useSubscription(MESSAGE_SUBSCRIPTION, {
    onSubscriptionData: ({ client, subscriptionData: { data: { message } } }) => {
      const prev = client.readFragment({
        id: `Conversation:${message.conversation.id}`,
        fragment: fragmentConv,
      });

      client.writeFragment({
        id: `Conversation:${message.conversation.id}`,
        fragment: fragmentConv,
        data: { ...prev, messages: [...prev.messages, message], lastMessage: message },
      });

      console.group('onSubscriptionData');
      console.log('message', message);
      console.log('prev', prev);
      console.groupEnd();
    },
  });

  return (
    <div>
      <div>{`Home: ${user.username}`}</div>
      <ConversationsList
        conversations={user.conversations}
        onConversationsListItemClick={setCurrentConversationId}
      />
      {currentConversationId && <ConversationContainer conversationId={currentConversationId} />}
      <Link to="/login">Login</Link>
    </div>
  );
};

export default Root;
