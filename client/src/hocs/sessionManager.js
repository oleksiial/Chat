import React from 'react';
import { compose, withState } from 'recompose';

import SessionContext from '../context/sessionContext';

export default WrappedComponent =>
  compose(
    withState('sessionLoading', 'setSessionLoading', true),

    withState('sessionId', 'setSessionId', undefined),

    withState('isLoggedIn', 'setIsLoggedIn', false)
  )(({ setSessionLoading, sessionLoading, sessionId, setSessionId, isLoggedIn, setIsLoggedIn }) => (
    <SessionContext.Provider
      value={{
        sessionLoading,
        setSessionLoading,
        sessionId,
        setSessionId,
        isLoggedIn,
        setIsLoggedIn
      }}
    >
      <WrappedComponent />
    </SessionContext.Provider>
  ));
