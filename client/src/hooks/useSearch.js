import { useLazyQuery } from '@apollo/react-hooks';
import { SEARCH } from '../requests';

const useSearch = () => {
  const [search, { loading, error, data }] = useLazyQuery(SEARCH);
  return {
    search: (pattern) => search({ variables: { pattern } }),
    loading,
    error,
    data,
  };
};

export default useSearch;
