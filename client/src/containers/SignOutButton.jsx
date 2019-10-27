import React from 'react';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { SIGN_OUT } from '../requests';

const SignOutButton = () => {
  const client = useApolloClient();
  const [mutate, { loading, error }] = useMutation(SIGN_OUT, {
    update: () => {
      client.resetStore();
    }
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error.</div>;

  return <button type="button" onClick={mutate}>Log out</button>;
};

export default SignOutButton;
