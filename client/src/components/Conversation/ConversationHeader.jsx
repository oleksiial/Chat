import React from 'react';

const ConversationHeader = ({ conversation }) => (
  <div className="conversationHeader">
    <p>{conversation.label}</p>
    {conversation.lastMessage && <p>{`Last message id: ${conversation.lastMessage.id}`}</p>}
    <p>{`${conversation.messages.length} messages`}</p>
  </div>
);

export default ConversationHeader;
