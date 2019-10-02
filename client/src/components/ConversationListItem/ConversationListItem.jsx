/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

const ConversationListItem = ({ conversation, onConversationsListItemClick }) => (
  <div
    className="conversationListItem"
    onClick={() => onConversationsListItemClick(conversation.id)}
  >
    <p>{conversation.label}</p>
    {conversation.lastMessage && <p>{`Last message text: ${conversation.lastMessage.text}`}</p> }
  </div>
);

export default ConversationListItem;
