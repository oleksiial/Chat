import React from 'react';
import ConversationListItem from './ConversationListItem';
import './styles.css';

const ConversationsList = ({ conversations, onClick }) => {
  return (
    <div className="conversationsList">
      {conversations.map(conv => (
        <ConversationListItem
          key={conv.id}
          id={conv.id}
          label={conv.label}
          lastMessage={conv.lastMessage}
          onClick={onClick}
        />
      ))}
    </div>
  );
};

export default ConversationsList;
