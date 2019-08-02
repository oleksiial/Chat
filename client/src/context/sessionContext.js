import { createContext } from 'react';

const SessionContext = createContext({
  sessionId: undefined,
  isLoggedIn: false,
  setSession: () => {},
  setIsLoggedIn: () => {}
});

export default SessionContext;
