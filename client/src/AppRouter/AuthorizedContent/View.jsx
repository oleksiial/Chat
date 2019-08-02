import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import ROUTES from '../constants';
import useSessionContext from '../../hooks/useSessionContext';
import useEntitiesLoadingContext from '../../hooks/useEntitiesLoadingContext';

const View = ({ path, component }) => {
  const { isLoggedIn } = useSessionContext();

  const {
    entitiesLoading: { user: userLoading }
  } = useEntitiesLoadingContext();

  if (userLoading) return <div>Loading...</div>;

  if (!isLoggedIn) return <Redirect to={ROUTES.login} />;

  return <Route path={path} component={component} />;
};

export default View;
