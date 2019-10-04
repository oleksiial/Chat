import React, { useState } from 'react';

import useSignIn from '../../hooks/useSignIn';
import useSignUp from '../../hooks/useSignUp';

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
  const [registration, setRegistration] = useState(false);

  const [username, setUsername] = useState('');
  const { signIn, loading: loadingSignIn, error: errorSignIn } = useSignIn();
  const { signUp, loading: loadingSignUp, error: errorSignUp } = useSignUp();

  if (errorSignIn || errorSignUp) return <div>Error.</div>;

  const handleClick = () => {
    if (registration) {
      signUp(username, '123', '123');
    } else {
      signIn(username, '123');
    }
  };

  return (
    <div className="login">
      <div>Login</div>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      <ButtonWithSpinner onClick={handleClick} loading={loadingSignIn || loadingSignUp}>
        {registration ? 'Sign up' : 'Sign in'}
      </ButtonWithSpinner>
      <button type="button" onClick={() => setRegistration((reg) => !reg)}>
        {registration ? 'Sign in' : 'Sign up'}
      </button>
    </div>
  );
};

export default Login;
