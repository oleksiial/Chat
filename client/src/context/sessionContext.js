import { createContext } from 'react';

const SessionContext = createContext({
  sessionLoading: true,
  sessionId: undefined,
  isLoggedIn: false,
  setSession: () => {},
  setIsLoggedIn: () => {},
  setSessionLoading: () => {}
});

export default SessionContext;
