import React from 'react';
import './styles.css';

const ConversationListItem = ({ id, label, lastMessage, onClick }) => {
  const handleClick = () => onClick(id);
  return (
    <div className="conversation--listitem" onClick={handleClick}>
      <p>
        {id}: {label}
      </p>
      {lastMessage && <p>{lastMessage.text}</p>}
    </div>
  );
};

export default ConversationListItem;
