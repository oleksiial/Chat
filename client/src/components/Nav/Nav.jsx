import React, { useState } from 'react';
import Search from '../Search/Search';
import ConversationsList from '../ConversationsList/ConversationsList';

const Nav = ({ conversations, onConversationsListItemClick }) => {
  const [searchResults, setSearchResults] = useState(null);
  return (
    <div className="nav">
      <Search onData={setSearchResults} />
      {searchResults
        ? <div>{searchResults.users.map((u) => <p key={u.id}>{u.username}</p>)}</div>
        : (
          <ConversationsList
            conversations={conversations}
            onConversationsListItemClick={onConversationsListItemClick}
          />
        )}
    </div>
  );
};

export default Nav;
