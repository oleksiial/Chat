import React from 'react';
import { useApolloClient } from '@apollo/react-hooks';

import Conversation from '../components/Conversation';
import { fragmentConv } from '../requests';
import useStartConversation from '../hooks/useStartConversation';

const FakeConversationContainer = ({ conversationId, setCurrentConversationId }) => {
  const { startConversation, data } = useStartConversation();

  if (data) {
    setCurrentConversationId(data.startConversation.id);
  }

  const client = useApolloClient();
  const conversation = client.readFragment({
    id: `Conversation:${conversationId}`,
    fragment: fragmentConv,
  });

  return (
    <Conversation
      conversation={conversation}
      onSendMessage={(_, message) => {
        startConversation(conversation.users[0].id, message);
      }}
    />
  );
};

export default (FakeConversationContainer);
