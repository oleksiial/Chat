/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import './ConversationListItem.css';

import React from 'react';

const ConversationListItem = ({ conversation, onConversationsListItemClick }) => (
  <div
    className="conversationListItem"
    onClick={() => onConversationsListItemClick(conversation.id)}
  >
    <p>{conversation.label}</p>
  </div>
);

export default ConversationListItem;
