import React from 'react';
import useAuth from '../hooks/useAuth';
import Header from '../components/Header';

const HeaderContainer = () => {
  const { user: { id, username } } = useAuth();
  return (
    <Header id={id} username={username} />
  );
};

export default HeaderContainer;
