import { useContext } from 'react';

import EntitiesLoadingContext from '../context/entitiesLoadingContext';

function useEntitiesLoadingContext() {
  const { entitiesLoading, setEntitiesLoading } = useContext(EntitiesLoadingContext);

  return {
    entitiesLoading,
    setEntitiesLoading
  };
}

export default useEntitiesLoadingContext;
