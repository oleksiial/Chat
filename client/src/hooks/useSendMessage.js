import { useMutation } from '@apollo/react-hooks';
import { NEW_MESSAGE, fragmentConv } from '../requests';

const useSendMessage = () => {
  const [mutate, { loading, error }] = useMutation(NEW_MESSAGE, {
    update(cache, { data: { sendMessage } }) {
      const prev = cache.readFragment({
        fragment: fragmentConv,
        id: `Conversation:${sendMessage.conversation.id}`,
      });

      cache.writeFragment({
        fragment: fragmentConv,
        id: `Conversation:${sendMessage.conversation.id}`,
        data: { ...prev, messages: [...prev.messages, sendMessage], lastMessage: sendMessage },
      });
    },
  });

  return {
    sendMessage: (conversationId, text) => mutate({ variables: { conversationId, text } }),
    loading,
    error,
  };
};

export default useSendMessage;
