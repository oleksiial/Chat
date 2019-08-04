import React, { useState } from 'react';
import { graphql, compose } from 'react-apollo';

import User from '../components/User';
import ConversationsList from '../components/ConversationsList';
import Messages from '../containers/Messages';
import { GET_ME } from '../requests';
import SignOutButton from '../containers/SignOutButton';
import withLastMessageSubscriptions from '../hocs/withLastMessageSubscriptions';
import useUserIdSetter from '../hooks/useUserIdSetter';

import './style.css';

function MainPageLayout({ isLoading, data }) {
  const [currentConversationId, setCurrentConversationId] = useState(null);

  useUserIdSetter((data && data.id) || null);

  if (isLoading) return <div>Loading...</div>;
  const { id, username, conversations } = data;

  return (
    <div className="mainPageWrap">
      <header className="header">
        <User id={id} username={username} />
        <SignOutButton />
      </header>

      <div className="content">
        <ConversationsList conversations={conversations} onClick={setCurrentConversationId} />
        {currentConversationId && <Messages conversationId={currentConversationId} />}
      </div>
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
  }),
  withLastMessageSubscriptions
)(MainPageLayout);
