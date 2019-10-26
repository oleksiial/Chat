/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import useAuth from '../../hooks/useAuth';

const ConversationListItem = ({ conversation, onConversationsListItemClick, currentConversationId }) => {
  const { id } = useAuth();

  return (
    <div
      className={`conversationListItem ${currentConversationId === conversation.id ? 'active' : ''}`}
      onClick={() => onConversationsListItemClick(conversation.id)}
    >
      <p>{conversation.label}</p>
      {conversation.lastMessage
      && <p>{`${conversation.lastMessage.user.id === id ? 'You: ' : ''}${conversation.lastMessage.text}`}</p>}
    </div>
  );
};

export default ConversationListItem;
