import React from 'react';
import ConversationListItem from './ConversationListItem';

const ConversationsList = ({ conversations, onConversationsListItemClick, currentConversationId }) => (
  <div className="conversationsList">
    {conversations.map((conversation) => (
      <ConversationListItem
        key={conversation.id}
        conversation={conversation}
        onConversationsListItemClick={onConversationsListItemClick}
        currentConversationId={currentConversationId}
      />
    ))}
  </div>
);

export default ConversationsList;
