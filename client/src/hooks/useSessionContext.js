import { useContext } from 'react';

import SessionContext from '../context/sessionContext';

function useSessionContext() {
  const {
    sessionLoading,
    setSessionLoading,
    sessionId,
    setSessionId,
    isLoggedIn,
    setIsLoggedIn
  } = useContext(SessionContext);

  return {
    sessionLoading,
    setSessionLoading,
    sessionId,
    setSessionId,
    isLoggedIn,
    setIsLoggedIn
  };
}

export default useSessionContext;
