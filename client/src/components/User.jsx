import React from 'react';

const User = ({ id, username }) => (
  <div>
    <p>
      {id}: {username}
    </p>
  </div>
);

export default User;
