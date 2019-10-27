import React from 'react';
import Nav from '../components/Nav';
import useAuth from '../hooks/useAuth';

const NavContainer = ({ currentConversationId, onConversationsListItemClick }) => {
  const { user: { id, conversations } } = useAuth();
  return (
    <Nav
      onConversationsListItemClick={onConversationsListItemClick}
      conversations={conversations}
      currentConversationId={currentConversationId}
      currentUserId={id}
    />
  );
};

export default NavContainer;
