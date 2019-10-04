import { useMutation } from '@apollo/react-hooks';
import { SIGN_UP, AUTH_DATA } from '../requests';

const useSignUp = () => {
  const [mutate, { loading, error }] = useMutation(SIGN_UP, {
    update(cache, { data: { signUp } }) {
      const { authData } = cache.readQuery({ query: AUTH_DATA });
      cache.writeQuery({
        query: AUTH_DATA,
        data: { authData: { ...authData, ...signUp } },
      });
    },
  });

  return {
    signUp: (username, password, passwordConfirmation) => mutate(
      { variables: { username, password, passwordConfirmation } },
    ),
    loading,
    error,
  };
};

export default useSignUp;
