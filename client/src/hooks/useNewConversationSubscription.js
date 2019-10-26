import { useSubscription } from '@apollo/react-hooks';
import { NEW_CONVERSATION_SUBSCRIPTION, fragmentUser } from '../requests';
import useAuth from './useAuth';

const useNewConversationSubscription = () => {
  const { id } = useAuth();
  useSubscription(NEW_CONVERSATION_SUBSCRIPTION, {
    onSubscriptionData: ({ client, subscriptionData: { data: { newConversation } } }) => {
      const prev = client.readFragment({
        id: `User:${id}`,
        fragment: fragmentUser,
      });

      client.writeFragment({
        id: `User:${id}`,
        fragment: fragmentUser,
        data: { ...prev, conversations: [...prev.conversations, newConversation] },
      });
    },
  });
};

export default useNewConversationSubscription;
