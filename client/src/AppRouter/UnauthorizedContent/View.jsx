import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import ROUTES from '../constants';
import SessionContext from '../../context/sessionContext';

const View = ({ path, component }) => {
  const { sessionLoading, isLoggedIn } = useContext(SessionContext);

  if (sessionLoading) return <div>Loading...</div>;

  if (isLoggedIn) return <Redirect to={ROUTES.home} />;

  return <Route path={path} component={component} />;
};

export default View;
