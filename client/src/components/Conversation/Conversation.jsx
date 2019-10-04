import React from 'react';

import useSendMessage from '../../hooks/useSendMessage';
import ConversationHeader from './ConversationHeader';
import ConversationContent from './ConversationContent';

const Conversation = ({ conversation }) => {
  const { sendMessage } = useSendMessage();
  return (
    <div className="conversationWrapper">
      <ConversationHeader conversation={conversation} onSendMessage={sendMessage} />
      <ConversationContent conversation={conversation} onSendMessage={sendMessage} />
    </div>
  );
};

export default Conversation;
