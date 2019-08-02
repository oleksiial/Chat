import React, { useEffect } from 'react';
import { MESSAGE_SUBSCRIPTION } from '../requests';

const withMessageSubscriptions = WrappedComponent => props => {
  const {
    data: { subscribeToMore, loading },
    conversationId
  } = props;

  useEffect(
    () =>
      subscribeToMore({
        document: MESSAGE_SUBSCRIPTION,
        variables: { conversationId },
        updateQuery: (
          { messages },
          {
            subscriptionData: {
              data: { message }
            }
          }
        ) => {
          if (!message) return messages;
          return { messages: [...messages, message] };
        }
      }),
    [conversationId, subscribeToMore]
  );

  if (loading) return <WrappedComponent {...props} />;

  return <WrappedComponent {...props} />;
};

export default withMessageSubscriptions;
