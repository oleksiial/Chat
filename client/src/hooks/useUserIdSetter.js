import { useEffect } from 'react';
import useSessionContext from './useSessionContext';

function useUserIdSetter(id) {
  const { setUserId } = useSessionContext();
  useEffect(() => {
    setUserId(id);
  }, [id, setUserId]);
}

export default useUserIdSetter;
