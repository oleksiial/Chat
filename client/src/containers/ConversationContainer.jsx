import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_CONVERSATION } from '../requests';
import Conversation from '../components/Conversation';

const ConversationContainer = ({ conversationId }) => {
  const { loading, error, data } = useQuery(GET_CONVERSATION, { variables: { conversationId } });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error.</div>;

  return <Conversation conversation={data.conversation} />;
};

export default (ConversationContainer);
