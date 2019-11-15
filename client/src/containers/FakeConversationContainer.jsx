import React from 'react';
import { useApolloClient } from '@apollo/react-hooks';

import Conversation from '../components/Conversation';
import { fragmentConv } from '../requests';
import useStartConversation from '../hooks/useStartConversation';

const FakeConversationContainer = ({ conversationId, setCurrentConversationId }) => {
  const { startConversation } = useStartConversation();
  const client = useApolloClient();
  const conversation = client.readFragment({
    id: `Conversation:${conversationId}`,
    fragment: fragmentConv,
  });

  console.log('render fake');

  return (
    <Conversation
      conversation={conversation}
      onSendMessage={(_, message) => {
        startConversation(conversation.users[0].id, message).then(
          ({ data: { startConversation: { id } } }) => setCurrentConversationId(() => id),
        );
      }}
    />
  );
};

export default (FakeConversationContainer);
