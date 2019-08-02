import { useContext } from 'react';

import SessionContext from '../context/sessionContext';

function useSessionContext() {
  const { sessionId, setSessionId, isLoggedIn, setIsLoggedIn } = useContext(SessionContext);

  return {
    sessionId,
    setSessionId,
    isLoggedIn,
    setIsLoggedIn
  };
}

export default useSessionContext;
