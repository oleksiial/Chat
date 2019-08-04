import { useContext } from 'react';

import SessionContext from '../context/sessionContext';

function useSessionContext() {
  const sessionContext = useContext(SessionContext);
  return { ...sessionContext };
}

export default useSessionContext;
