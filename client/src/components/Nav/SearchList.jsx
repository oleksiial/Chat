import React from 'react';
import SearchListItem from './SearchListItem';

const SearchList = ({
  data,
  conversations,
  currentConversationId,
  onConversationsListItemClick,
  onSearchUserItemClick,
  onSearchConversationItemClick,
}) => (
  <div className="searchList">
    {data.search.filteredUsers.map((user) => {
      const existedConversation = conversations.find(
        (conv) => conv.users.find((u) => u.id === user.id),
      );

      return (
        <SearchListItem
          key={user.id}
          user={user}
          currentConversationId={currentConversationId}
          conversationId={existedConversation && existedConversation.id}
          onClick={
            existedConversation
              ? () => onConversationsListItemClick(existedConversation.id)
              : () => onSearchUserItemClick(user)
        }
        />
      );
    })}
  </div>
);

export default SearchList;
