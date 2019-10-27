import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { SIGN_OUT } from '../requests';

const useSignOut = () => {
  const client = useApolloClient();
  const [mutate, { loading, error }] = useMutation(SIGN_OUT, {
    update: () => {
      client.resetStore();
    },
  });

  return {
    signOut: mutate,
    loading,
    error,
  };
};

export default useSignOut;
