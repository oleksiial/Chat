import React, { useState } from 'react';
import ConversationsList from './ConversationsList';

import useStartConversation from '../../hooks/useStartConversation';
import useSearch from '../../hooks/useSearch';
import SearchList from './SearchList';

const Nav = ({
  conversations, onConversationsListItemClick, currentConversationId, currentUserId,
}) => {
  const [input, setInput] = useState('');
  const { search, data } = useSearch();
  const { startConversation } = useStartConversation();

  const handleSearchListItemClick = (userId) => {
    startConversation(userId);
    setInput('');
  };

  return (
    <div className="nav">
      <input
        className="searchInput"
        type="text"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          search(e.target.value);
        }}
      />
      {data && input
        ? (
          <SearchList
            data={data}
            onSearchListItemClick={handleSearchListItemClick}
            conversations={conversations}
          />
        )
        : (
          <ConversationsList
            conversations={conversations}
            onConversationsListItemClick={onConversationsListItemClick}
            currentConversationId={currentConversationId}
            currentUserId={currentUserId}
          />
        )}
    </div>
  );
};

export default Nav;
