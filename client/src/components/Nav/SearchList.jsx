import React from 'react';
import SearchListItem from './SearchListItem';

const SearchList = ({ data, onSearchListItemClick, conversations }) => (
  <div className="searchList">
    {data.search.users.map((user) => (
      <SearchListItem
        key={user.id}
        user={user}
        onClick={onSearchListItemClick}
        conversationExists={!!conversations.find((conv) => conv.label === user.id)}
      />
    ))}
  </div>
);

export default SearchList;
