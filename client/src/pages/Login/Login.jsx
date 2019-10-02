import React, { useState } from 'react';

import useSignIn from '../../hooks/useSignIn';

const ButtonWithSpinner = ({ onClick, loading, children }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={loading}
  >
    {loading ? 'Loading...' : children}
  </button>
);

const Login = () => {
  const [username, setUsername] = useState('');
  const { signIn, loading, error } = useSignIn();

  if (error) return <div>Error.</div>;

  return (
    <div>
      <div>Login</div>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      <ButtonWithSpinner onClick={() => signIn(username, '123')} loading={loading}>Log in</ButtonWithSpinner>
    </div>
  );
};

export default Login;
