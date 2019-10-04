import React from 'react';

const ConversationHeader = ({ conversation }) => (
  <div className="conversationHeader">
    <p className="conversationHeader__text">{conversation.label}</p>
  </div>
);

export default ConversationHeader;
