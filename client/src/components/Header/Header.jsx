import './Header.css';

import React from 'react';
import SignOutButton from '../../containers/SignOutButton';

const Header = ({ user }) => (
  <div>
    {user && <SignOutButton />}
    {user && <p>{user.username}</p>}
  </div>
);

export default Header;
