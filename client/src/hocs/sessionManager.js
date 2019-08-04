import React, { useState } from 'react';
import SessionContext from '../context/sessionContext';

export default WrappedComponent => props => {
  const [userId, setUserId] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <SessionContext.Provider
      value={{
        userId,
        setUserId,
        sessionId,
        setSessionId,
        isLoggedIn,
        setIsLoggedIn
      }}
    >
      <WrappedComponent {...props} />
    </SessionContext.Provider>
  );
};
