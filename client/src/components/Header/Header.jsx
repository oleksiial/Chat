import React from 'react';
import SignOutButton from '../../containers/SignOutButton';

const Header = ({ user }) => (
  <div className="header">
    <div className="headerWrapper">
      {user && <p>{user.username}</p>}
      {user && <SignOutButton />}
    </div>
  </div>
);

export default Header;
