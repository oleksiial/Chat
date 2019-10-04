import React from 'react';

const ConversationContent = ({ conversation, onSendMessage }) => (
  <div className="conversationContent">

    <div className="messages">
      <div className="forReversingItsContent">
        {conversation.messages.map((message) => (
          <p className="message" key={message.id}>
            {`${message.id}: ${message.text}`}
          </p>
        ))}
      </div>
    </div>
    <div className="sendButton">
      <button type="button" onClick={() => onSendMessage(conversation.id, 'new message text')}>send</button>
    </div>
  </div>
);

export default ConversationContent;
