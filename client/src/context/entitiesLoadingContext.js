import { createContext } from 'react';

const EntitiesLoadingContext = createContext({
  entitiesLoading: {
    user: true,
    rooms: true,
    conversations: true,
    messages: true
  },
  setEntitiesLoading: () => {}
});

export default EntitiesLoadingContext;
