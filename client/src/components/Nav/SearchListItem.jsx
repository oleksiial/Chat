import React from 'react';

const SearchListItem = ({ user, onClick, conversationExists }) => (
  <div className="searchListItem">
    <p>{user.username}</p>
    {!conversationExists && (
    <button
      type="button"
      onClick={() => onClick(user.id)}
    >
      Start conversation
    </button>
    )}
  </div>
);

export default SearchListItem;
