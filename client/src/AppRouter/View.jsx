import React, { useEffect } from 'react';
import { BrowserRouter, Redirect, Switch } from 'react-router-dom';

import ROUTES from './constants';
import UnauthorizedContent from './UnauthorizedContent';
import AuthorizedContent from './AuthorizedContent';
import LoginForm from '../containers/LoginForm';
import MainPage from '../Layouts/MainPage';
import useSessionContext from '../hooks/useSessionContext';
import useEntitiesLoadingContext from '../hooks/useEntitiesLoadingContext';

const View = ({ sessionLoading, isLoggedIn }) => {
  useRouter(sessionLoading, isLoggedIn);

  return (
    <BrowserRouter>
      <Switch>
        <UnauthorizedContent path={ROUTES.login} component={LoginForm} />

        <AuthorizedContent path={ROUTES.home} component={MainPage} />

        <Redirect to={ROUTES.home} />
      </Switch>
    </BrowserRouter>
  );
};

function useRouter(sessionLoading, isLoggedIn) {
  const { setIsLoggedIn } = useSessionContext();

  const { setEntitiesLoading } = useEntitiesLoadingContext();

  useEffect(() => {
    setEntitiesLoading('user', sessionLoading);
    setIsLoggedIn(isLoggedIn);
  }, [sessionLoading, isLoggedIn, setIsLoggedIn, setEntitiesLoading]);
}

export default View;
