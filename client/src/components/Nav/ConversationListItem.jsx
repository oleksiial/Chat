/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import classNames from 'classnames';

const ConversationListItem = ({
  conversation, onConversationsListItemClick, currentConversationId, currentUserId,
}) => {
  const divClass = classNames({
    conversationListItem: true,
    active: conversation.id === currentConversationId,
  });

  const shorten = (s) => {
    if (s.length < 25) return s;
    return `${s.substring(0, 25)}...`;
  };

  return (
    <div
      className={divClass}
      onClick={() => onConversationsListItemClick(conversation.id)}
    >
      <p>{conversation.label}</p>
      {conversation.lastMessage
      && (
      <p className="lastMesasge">
        {
          conversation.lastMessage.user.id === currentUserId
            ? `You: ${shorten(conversation.lastMessage.text)}`
            : shorten(conversation.lastMessage.text)
        }
      </p>
      )}
    </div>
  );
};

export default ConversationListItem;
