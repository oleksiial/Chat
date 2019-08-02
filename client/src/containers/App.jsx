import React from 'react';
import { compose } from 'recompose';

import AppRouter from '../AppRouter';
import sessionManager from '../hocs/sessionManager';
import entitiesLoadingManager from '../hocs/entitiesLoadingManager';

const App = () => {
  return (
    <div className="app">
      <AppRouter />
    </div>
  );
};

export default compose(
  entitiesLoadingManager,
  sessionManager
)(App);
