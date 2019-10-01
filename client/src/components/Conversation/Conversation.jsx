import './Conversation.css';

import React from 'react';

const Conversation = ({ conversation }) => (
  <div className="conversation">
    <p>{conversation.label}</p>
    {conversation.lastMessage && <p>{`Last message id: ${conversation.lastMessage.id}`}</p>}
    <p>{`${conversation.messages.length} messages`}</p>
  </div>
);

export default Conversation;
