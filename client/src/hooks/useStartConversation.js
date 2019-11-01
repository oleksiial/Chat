import { useMutation } from '@apollo/react-hooks';
import { START_CONVERSATION } from '../requests';

const useStartConversation = () => {
  const [startConversation, { loading, error, data }] = useMutation(START_CONVERSATION);
  return {
    startConversation: (userId, message) => startConversation({ variables: { userId, message } }),
    loading,
    error,
    data,
  };
};

export default useStartConversation;
