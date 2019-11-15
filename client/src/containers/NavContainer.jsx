import React from 'react';
import { useMutation } from '@apollo/react-hooks';

import Nav from '../components/Nav';
import useAuth from '../hooks/useAuth';
import { CREATE_FAKE_CONVERSATION } from '../requests';

const NavContainer = ({ currentConversationId, onConversationsListItemClick }) => {
  const { user: { id: currentUserId, conversations } } = useAuth();
  const [createFakeConversation] = useMutation(CREATE_FAKE_CONVERSATION);

  const handleSearchUserItemClick = (selectedUser) => {
    createFakeConversation({ variables: { selectedUser } }).then(
      ({ data: { createFakeConversation: { id } } }) => onConversationsListItemClick(id),
    );
  };

  const handleSearchConversationItemClick = (convId) => {
    onConversationsListItemClick(convId);
  };

  return (
    <Nav
      conversations={conversations}
      currentUserId={currentUserId}
      currentConversationId={currentConversationId}
      onConversationsListItemClick={onConversationsListItemClick}
      onSearchUserItemClick={handleSearchUserItemClick}
      onSearchConversationItemClick={handleSearchConversationItemClick}
    />
  );
};

export default NavContainer;
