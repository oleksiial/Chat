import { useApolloClient } from '@apollo/react-hooks';
import { AUTH_DATA } from '../requests';

const useAuth = () => {
  const client = useApolloClient();
  const { authData } = client.readQuery({ query: AUTH_DATA });

  return authData;
};

export default useAuth;
