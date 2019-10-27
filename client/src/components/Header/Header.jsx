import React from 'react';
import SignOutButton from '../../containers/SignOutButton';

const Header = ({ id, username }) => (
  <div className="header">
    <div className="headerWrapper">
      <p>{`${id}: ${username}`}</p>
      <SignOutButton />
    </div>
  </div>
);

export default Header;
