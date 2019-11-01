import React, { useState } from 'react';
import ConversationsList from './ConversationsList';

import useStartConversation from '../../hooks/useStartConversation';
import useSearch from '../../hooks/useSearch';
import SearchList from './SearchList';

const Nav = ({
  conversations,
  onConversationsListItemClick,
  currentConversationId,
  currentUserId,
  onSearchItemClick,
}) => {
  const [input, setInput] = useState('');
  const { search, data } = useSearch();
  const { startConversation } = useStartConversation();

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
            onSearchListItemClick={onSearchItemClick}
            onConversationsListItemClick={onConversationsListItemClick}
            conversations={conversations}
            currentConversationId={currentConversationId}
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
