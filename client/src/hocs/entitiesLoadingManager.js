import React from 'react';
import { compose, withStateHandlers } from 'recompose';

import EntitiesLoadingContext from '../context/entitiesLoadingContext';

export default WrappedComponent =>
  compose(
    withStateHandlers(
      {
        entitiesLoading: {
          user: false,
          rooms: false,
          conversations: false,
          messages: false
        }
      },
      {
        setEntitiesLoading: ({ entitiesLoading }) => (entityKey, loadingValue) => {
          return {
            entitiesLoading: {
              ...entitiesLoading,
              [entityKey]: loadingValue
            }
          };
        }
      }
    )
  )(({ entitiesLoading, setEntitiesLoading }) => (
    <EntitiesLoadingContext.Provider value={{ entitiesLoading, setEntitiesLoading }}>
      <WrappedComponent />
    </EntitiesLoadingContext.Provider>
  ));
