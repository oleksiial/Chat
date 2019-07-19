import React from 'react';
import './ChatMessages.css';

import PropTypes from 'prop-types';

const propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      from: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired
    }).isRequired
  )
};

const Message = ({ message }) => (
  <div className="message">
    <span className="from">{message.sender}: </span>
    {message.text}
  </div>
);

const ChatMessages = ({ messages }) => (
  <div className="messages">
    {messages.map((m, i) => (
      <Message key={i} message={m} />
    ))}
  </div>
);

ChatMessages.propTypes = propTypes;

export default ChatMessages;
