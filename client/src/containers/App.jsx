import React from 'react';

import AppRouter from '../AppRouter';
import sessionManager from '../hocs/sessionManager';

const App = () => {
  return (
    <div className="app">
      <AppRouter />
    </div>
  );
};

export default sessionManager(App);
