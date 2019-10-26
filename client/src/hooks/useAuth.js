import { useApolloClient } from '@apollo/react-hooks';
import { AUTH_DATA } from '../requests';

const useAuth = () => {
  const client = useApolloClient();
  const { authData: { user } } = client.readQuery({ query: AUTH_DATA });

  return user;
};

export default useAuth;
