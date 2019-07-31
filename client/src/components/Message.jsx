import React from 'react';

import './styles.css';

const Message = ({ user, text }) => {
  return (
    <div className="message">
      <p>
        {user.id}: {text}
      </p>
    </div>
  );
};
export default Message;
