import React, { useState } from 'react';
import { graphql, compose } from 'react-apollo';

import User from '../components/User';
import ConversationsList from '../components/ConversationsList';
import Messages from '../containers/Messages';
import { GET_ME, MESSAGE_SUBSCRIPTION } from '../requests';
import SignOutButton from '../containers/SignOutButton';

function MainPageLayout({ isLoading, data, subscribeToMore }) {
  const [currentConversationId, setCurrentConversationId] = useState(null);

  if (isLoading) return <div>Loading...</div>;

  const { id, username, conversations } = data;

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
              conv.id === c.id
                ? { ...conv, messages: [...(conv.messages || []), message], lastMessage: message }
                : conv
            )
          }
        };
      }
    });
  });

  return (
    <div className="mainPageWrap">
      <header className="header">
        <User id={id} username={username} />
        <SignOutButton />
      </header>

      <content className="content">
        <ConversationsList conversations={conversations} onClick={setCurrentConversationId} />
        {currentConversationId && <Messages conversationId={currentConversationId} />}
      </content>
    </div>
  );
}

export default compose(
  graphql(GET_ME, {
    props: ({ data: { loading, me, subscribeToMore } }) => {
      return {
        isLoading: loading,
        data: me,
        subscribeToMore
      };
    }
  })
)(MainPageLayout);
