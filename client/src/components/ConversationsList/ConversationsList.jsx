import './ConversationsList.css';

import React from 'react';
import ConversationListItem from '../ConversationListItem';

const ConversationsList = ({ conversations, onConversationsListItemClick }) => (
  <div className="conversationsList">
    {conversations.map((conversation) => (
      <ConversationListItem
        key={conversation.id}
        conversation={conversation}
        onConversationsListItemClick={onConversationsListItemClick}
      />
    ))}
  </div>
);

export default ConversationsList;
