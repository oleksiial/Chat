import React, { useState, useContext } from 'react';
import SessionContext from '../../context/sessionContext';

import './LoginForm.css';

const LoginForm = ({ onSignIn, onSignUp }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistration, setIsRegistration] = useState(false);
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const { setSessionId, setIsLoggedIn } = useContext(SessionContext);

  const handleSignIn = () => {
    onSignIn(username, password)
      .then(({ data: { signIn } }) => {
        setIsLoggedIn(Boolean(signIn));
        setSessionId(signIn);
      })
      .catch(e => console.log(e));
  };

  const handleSignUp = () => {
    onSignUp(username, password, passwordConfirmation)
      .then(({ data: { signUp } }) => {
        setIsLoggedIn(Boolean(signUp));
        setSessionId(signUp);
      })
      .catch(e => console.log(e));
  };

  const handleToggle = () => {
    setIsRegistration(!isRegistration);
  };

  return (
    <div className="loginform">
      <div className="inputwrap">
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="username"
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="password"
        />
        {isRegistration && (
          <input
            type="password"
            value={passwordConfirmation}
            onChange={e => setPasswordConfirmation(e.target.value)}
            placeholder="password confirmation"
          />
        )}
      </div>
      <button className="togglebutton" onClick={handleToggle}>
        {isRegistration ? 'Sign In' : 'Sign Up'}
      </button>
      <button
        type="button"
        className="submitbutton"
        onClick={isRegistration ? handleSignUp : handleSignIn}
      >
        {isRegistration ? 'Sign Up' : 'Sign In'}
      </button>
    </div>
  );
};

export default LoginForm;
