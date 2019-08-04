import React from 'react';
import classNames from 'classnames';

import './styles.css';

import useSessionContext from '../hooks/useSessionContext';

const Message = ({ user, text }) => {
  const { userId } = useSessionContext();
  const messageClass = classNames({
    messageWrap: true,
    myMessage: user.id === userId
  });

  return (
    <div className={messageClass}>
      <div className="message">
        <p>{text}</p>
      </div>
    </div>
  );
};
export default Message;
