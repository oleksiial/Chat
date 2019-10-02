import { useMutation } from '@apollo/react-hooks';
import { SIGN_IN, AUTH_DATA } from '../requests';

const useSignIn = () => {
  const [mutate, { loading, error }] = useMutation(SIGN_IN, {
    update(cache, { data: { signIn } }) {
      const { authData } = cache.readQuery({ query: AUTH_DATA });
      cache.writeQuery({
        query: AUTH_DATA,
        data: { authData: { ...authData, ...signIn } },
      });
    },
  });

  return {
    signIn: (username, password) => mutate({ variables: { username, password } }),
    loading,
    error,
  };
};

export default useSignIn;
