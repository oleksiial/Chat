/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import classNames from 'classnames';

const SearchListItem = ({
  user, onClick, conversationId, currentConversationId,
}) => {
  const divClass = classNames({
    searchListItem: true,
    active: conversationId === currentConversationId,
  });

  return (
    <div
      className={divClass}
      onClick={onClick}
    >
      <p>{user.username}</p>
    </div>
  );
};

export default SearchListItem;
