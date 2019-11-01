import React from 'react';
import { useApolloClient } from '@apollo/react-hooks';

import Nav from '../components/Nav';
import useAuth from '../hooks/useAuth';
import { fragmentUser } from '../requests';

const NavContainer = ({ currentConversationId, onConversationsListItemClick }) => {
  const { user: { id, conversations } } = useAuth();
  const client = useApolloClient();

  const handleSearchItemClick = (user) => {
    const prev = client.readFragment({
      id: `User:${id}`,
      fragment: fragmentUser,
    });

    const newConversationId = Math.min(...prev.conversations.map((conv) => conv.id), 0) - 1;
    const newConversation = {
      id: newConversationId,
      label: user.username,
      type: 'private',
      messages: [],
      lastMessage: null,
      users: [user],
      __typename: 'Conversation',
    };

    client.writeFragment({
      id: `User:${id}`,
      fragment: fragmentUser,
      data: {
        ...prev,
        conversations: [
          ...prev.conversations,
          newConversation,
        ],
      },
    });

    onConversationsListItemClick(newConversationId);
  };

  return (
    <Nav
      onConversationsListItemClick={onConversationsListItemClick}
      conversations={conversations}
      currentConversationId={currentConversationId}
      currentUserId={id}
      onSearchItemClick={handleSearchItemClick}
    />
  );
};

export default NavContainer;
