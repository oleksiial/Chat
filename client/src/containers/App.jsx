import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

import { AUTH_DATA } from '../requests';
import Login from '../pages/Login';
import Root from '../pages/Root';

import LoginRoute from '../routes/LoginRoute';
import ProtectedRoute from '../routes/ProtectedRoute';

const App = () => {
  const { loading, error } = useQuery(AUTH_DATA);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error.</div>;

  return (
    <BrowserRouter>
      <div className="container">
        <Switch>
          <LoginRoute path="/login" render={() => <Login />} />
          <ProtectedRoute path="/" render={() => <Root />} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
