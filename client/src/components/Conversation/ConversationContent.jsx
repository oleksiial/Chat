import React from 'react';
import useAuth from '../../hooks/useAuth';

const ConversationContent = ({ conversation, onSendMessage }) => {
  const user = useAuth();
  const inputRef = React.createRef();

  const handleSend = () => {
    onSendMessage(conversation.id, inputRef.current.value);
    inputRef.current.value = '';
  };

  const handlePressEnter = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="conversationContent">

      <div className="messages">
        <div className="messagesInnerWrapper">
          {conversation.messages.map((message) => (
            <p className={`message${user.id === message.user.id ? ' own' : ''}`} key={message.id}>
              {`${message.id}: ${message.text}`}
            </p>
          ))}
        </div>
      </div>
      <div className="sendField">
        <input type="text" ref={inputRef} onKeyPress={handlePressEnter} />
        <button type="button" className="sendButton" onClick={handleSend}>send</button>
      </div>
    </div>
  );
};

export default ConversationContent;
