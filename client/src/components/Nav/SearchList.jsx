import React from 'react';
import SearchListItem from './SearchListItem';

const SearchList = ({
  data, onSearchListItemClick, onConversationsListItemClick, conversations, currentConversationId,
}) => (
  <div className="searchList">
    {data.search.users.map((user) => {
      const existedConversation = conversations.find(
        (conv) => conv.users.find((u) => u.id === user.id),
      );

      console.log(existedConversation);

      return (
        <SearchListItem
          key={user.id}
          user={user}
          currentConversationId={currentConversationId}
          conversationId={existedConversation && existedConversation.id}
          onClick={
            existedConversation
              ? () => onConversationsListItemClick(existedConversation.id)
              : () => onSearchListItemClick(user)
        }
        />
      );
    })}
  </div>
);

export default SearchList;
