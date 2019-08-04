import { createContext } from 'react';

const SessionContext = createContext({
  userId: undefined,
  sessionId: undefined,
  isLoggedIn: false,
  setSession: () => {},
  setIsLoggedIn: () => {},
  setUserId: () => {},
});

export default SessionContext;
