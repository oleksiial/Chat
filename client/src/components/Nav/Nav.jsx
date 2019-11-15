import React, { useState } from 'react';
import ConversationsList from './ConversationsList';

import useSearch from '../../hooks/useSearch';
import SearchList from './SearchList';

const Nav = ({
  conversations,
  currentUserId,
  currentConversationId,
  onConversationsListItemClick,
  onSearchUserItemClick,
  onSearchConversationItemClick,
}) => {
  const [input, setInput] = useState('');
  const { search, data } = useSearch();

  console.group('Nav');
  console.log('search data', data);
  console.log('conversations', conversations);
  console.groupEnd();

  return (
    <div className="nav">
      <input
        className="searchInput"
        type="text"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          if (e.target.value !== '') {
            search(e.target.value);
          }
        }}
      />
      {data && input
        ? (
          <SearchList
            data={data}
            onSearchUserItemClick={onSearchUserItemClick}
            onConversationsListItemClick={onConversationsListItemClick}
            conversations={conversations}
            currentConversationId={currentConversationId}
          />
        )
        : (
          <ConversationsList
            // conversations={conversations}
            conversations={conversations.filter((conv) => conv.id !== -1)}
            currentUserId={currentUserId}
            currentConversationId={currentConversationId}
            onConversationsListItemClick={onConversationsListItemClick}
          />
        )}
    </div>
  );
};

export default Nav;
