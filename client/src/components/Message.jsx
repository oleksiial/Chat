import React from 'react';
import './styles.css';

const Message = ({ id, sender, text }) => (
  <div className="message">
    <p>
      {sender.id}: {text}
    </p>
  </div>
);

export default Message;
