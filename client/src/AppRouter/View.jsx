import React, { useEffect } from 'react';
import { BrowserRouter, Redirect, Switch } from 'react-router-dom';

import ROUTES from './constants';
import UnauthorizedContent from './UnauthorizedContent';
import AuthorizedContent from './AuthorizedContent';
import SignForm from '../containers/SignForm';
import Content from '../containers/Content';
import useSessionContext from '../hooks/useSessionContext';

const View = ({ sessionLoading, isLoggedIn }) => {
  useRouter(sessionLoading, isLoggedIn);

  return (
    <BrowserRouter>
      <Switch>
        <UnauthorizedContent path={ROUTES.login} component={SignForm} />

        <AuthorizedContent path={ROUTES.home} component={Content} />

        <Redirect to={ROUTES.home} />
      </Switch>
    </BrowserRouter>
  );
};

function useRouter(sessionLoading, isLoggedIn) {
  const { setSessionLoading, setIsLoggedIn } = useSessionContext();

  useEffect(() => {
    setSessionLoading(sessionLoading);
    setIsLoggedIn(isLoggedIn);
  }, [sessionLoading, isLoggedIn, setSessionLoading, setIsLoggedIn]);
}

export default View;
