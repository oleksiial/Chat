import React from 'react';

import useSendMessage from '../../hooks/useSendMessage';

const Conversation = ({ conversation }) => {
  const { sendMessage, loading } = useSendMessage();
  return (
    <div className="conversationWrapper">
      <div className="conversationHeader">
        <p>{conversation.label}</p>
        {conversation.lastMessage && <p>{`Last message id: ${conversation.lastMessage.id}`}</p>}
        <p>{`${conversation.messages.length} messages`}</p>
      </div>
      <div className="conversationContent">
        <button type="button" onClick={() => sendMessage(conversation.id, 'new message text')}>send</button>
        {conversation.messages.map((message) => (
          <p key={message.id}>
            {`${message.id}: ${message.text}`}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Conversation;
