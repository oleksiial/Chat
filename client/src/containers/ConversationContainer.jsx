import React from 'react';
import { useQuery, useApolloClient } from '@apollo/react-hooks';
import { GET_CONVERSATION } from '../requests';
import Conversation from '../components/Conversation';
import useSendMessage from '../hooks/useSendMessage';

const ConversationContainer = ({ conversationId }) => {
  const client = useApolloClient();
  console.log(client.store);

  const { loading, error, data } = useQuery(GET_CONVERSATION, { variables: { conversationId } });
  const { sendMessage } = useSendMessage();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error.</div>;

  return <Conversation conversation={data.conversation} onSendMessage={sendMessage} />;
};

export default (ConversationContainer);
