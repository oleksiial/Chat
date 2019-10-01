import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

import { AUTH_DATA } from '../requests';
import Login from '../pages/Login';
import Root from '../pages/Root';
import Header from '../components/Header/Header';

import LoginRoute from '../routes/LoginRoute';
import ProtectedRoute from '../routes/ProtectedRoute';

const App = () => {
  const { loading, error, data } = useQuery(AUTH_DATA);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error.</div>;

  const { user, isLoggedIn } = data.authData;

  return (
    <BrowserRouter>
      <Header user={user} isLoggedIn={isLoggedIn} />
      <Switch>
        <LoginRoute path="/login" render={() => <Login />} />
        <ProtectedRoute path="/" render={() => <Root user={user} />} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
