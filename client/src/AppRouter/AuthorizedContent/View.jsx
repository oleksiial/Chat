import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import ROUTES from '../constants';
import useSessionContext from '../../hooks/useSessionContext';

const View = ({ path, component }) => {
  const { sessionLoading, isLoggedIn } = useSessionContext();

  if (sessionLoading) return <div>Loading...</div>;

  if (!isLoggedIn) return <Redirect to={ROUTES.login} />;

  return <Route path={path} component={component} />;
};

export default View;
