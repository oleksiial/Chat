import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { SIGN_IN, AUTH_DATA } from '../requests';

const SignInButton = ({ username, password }) => {
  const [mutate, { loading, error }] = useMutation(SIGN_IN, {
    update(cache, { data: { signIn } }) {
      const { authData } = cache.readQuery({ query: AUTH_DATA });
      cache.writeQuery({
        query: AUTH_DATA,
        data: { authData: { ...authData, ...signIn } },
      });
    },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error.</div>;

  return <button type="button" onClick={() => mutate({ variables: { username, password } })}>Log in</button>;
};

export default SignInButton;
