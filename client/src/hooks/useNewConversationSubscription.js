import { useSubscription } from '@apollo/react-hooks';
import { NEW_CONVERSATION_SUBSCRIPTION, fragmentUser } from '../requests';
import useAuth from './useAuth';

const useNewConversationSubscription = () => {
  const { user: { id }, sid } = useAuth();

  useSubscription(NEW_CONVERSATION_SUBSCRIPTION, {
    variables: { sid },
    onSubscriptionData: ({ client, subscriptionData: { data: { newConversation } } }) => {
      const label = newConversation.type === 'private'
        ? newConversation.users.find(user => user.id !== id).username
        : newConversation.label;

      const prev = client.readFragment({
        id: `User:${id}`,
        fragment: fragmentUser,
      });

      client.writeFragment({
        id: `User:${id}`,
        fragment: fragmentUser,
        data: { ...prev, conversations: [
          ...prev.conversations,
          { ...newConversation, label }
        ] },
      });
    },
  });
};

export default useNewConversationSubscription;
