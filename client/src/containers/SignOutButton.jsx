import React from 'react';
import useSignOut from '../hooks/useSignOut';

const SignOutButton = () => {
  const { signOut, loading, error } = useSignOut();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error.</div>;

  return <button type="button" onClick={signOut}>Log out</button>;
};

export default SignOutButton;
