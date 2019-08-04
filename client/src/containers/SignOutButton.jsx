import React from 'react';
import { compose, graphql, withApollo } from 'react-apollo';
import useSessionContext from '../hooks/useSessionContext';

import { SIGN_OUT } from '../requests';

const SignOutButton = ({ onSubmit, client }) => {
  const { setSessionId, setIsLoggedIn } = useSessionContext();
  const handleSubmit = () => {
    onSubmit()
      .then(() => {
        client.cache.reset();
        setIsLoggedIn(false);
        setSessionId(null);
      })
      .catch(e => console.log(e));
  };

  return (
    <button id="signOutButton" onClick={handleSubmit}>
      Sign out
    </button>
  );
};

export default compose(
  graphql(SIGN_OUT, {
    props: ({ mutate }) => ({
      onSubmit: () => mutate()
    })
  }),
  withApollo
)(SignOutButton);
