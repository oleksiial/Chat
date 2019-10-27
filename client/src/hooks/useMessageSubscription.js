import { useSubscription } from '@apollo/react-hooks';
import { MESSAGE_SUBSCRIPTION, fragmentConv } from '../requests';
import useAuth from './useAuth';

const useMessageSubscription = () => {
  const { sid } = useAuth();
  
  useSubscription(MESSAGE_SUBSCRIPTION, {
    variables: { sid },
    onSubscriptionData: ({ client, subscriptionData: { data: { message } } }) => {
      const prev = client.readFragment({
        id: `Conversation:${message.conversation.id}`,
        fragment: fragmentConv,
      });

      client.writeFragment({
        id: `Conversation:${message.conversation.id}`,
        fragment: fragmentConv,
        data: { ...prev, messages: [...prev.messages, message], lastMessage: message },
      });
    },
  });
};

export default useMessageSubscription;
