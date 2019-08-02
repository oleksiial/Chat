import React, { useEffect } from 'react';
import { MESSAGE_SUBSCRIPTION } from '../requests';

const withLastMessageSubscriptions = WrappedComponent => props => {
  const { data, subscribeToMore, isLoading } = props;

  useEffect(() => {
    if (isLoading) return;

    const { conversations } = data;

    conversations.forEach(c => {
      subscribeToMore({
        document: MESSAGE_SUBSCRIPTION,
        variables: { conversationId: c.id },
        updateQuery: (
          { me },
          {
            subscriptionData: {
              data: { message }
            }
          }
        ) => {
          if (!message) return me;
          return {
            me: {
              ...me,
              conversations: me.conversations.map(conv =>
                conv.id === c.id ? { ...conv, lastMessage: message } : conv
              )
            }
          };
        }
      });
    });
  }, [data, isLoading, subscribeToMore]);

  return <WrappedComponent {...props} />;
};

export default withLastMessageSubscriptions;
