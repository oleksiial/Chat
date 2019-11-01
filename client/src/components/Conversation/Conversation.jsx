import React from 'react';

import ConversationHeader from './ConversationHeader';
import ConversationContent from './ConversationContent';

const Conversation = ({ conversation, onSendMessage }) => (
  <div className="conversationWrapper">
    <ConversationHeader conversation={conversation} onSendMessage={onSendMessage} />
    <ConversationContent conversation={conversation} onSendMessage={onSendMessage} />
  </div>
);

export default Conversation;
