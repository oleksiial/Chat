import React, { useState, useContext } from 'react';
import { graphql } from 'react-apollo';

import { SIGN_IN } from '../requests';
import SessionContext from '../context/sessionContext';

const SignForm = ({ onSubmit }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistration, setIsRegistration] = useState(false);
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const { setSessionId, setIsLoggedIn } = useContext(SessionContext);

  const handleSubmit = () => {
    onSubmit(username, password)
      .then(({ data: { signIn } }) => {
        setIsLoggedIn(Boolean(signIn));
        setSessionId(signIn);
      })
      .catch(e => console.log(e));
  };

  return (
    <div className="signform">
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
      <button type="button" onClick={handleSubmit}>
        SignIn
      </button>
    </div>
  );
};

export default graphql(SIGN_IN, {
  props: ({ mutate }) => ({
    onSubmit: (username, password) => mutate({ variables: { username, password } })
  })
})(SignForm);
