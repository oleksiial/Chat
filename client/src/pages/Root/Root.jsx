import './Root.css';

import React, { useState } from 'react';
import ConversationContainer from '../../containers/ConversationContainer';
import useMessageSubscription from '../../hooks/useMessageSubscription';
import Nav from '../../components/Nav';

const Root = ({ user }) => {
  const [currentConversationId, setCurrentConversationId] = useState(null);
  useMessageSubscription(user.conversations.map((c) => c.id));

  return (
    <div className="rootWrapper">
      <Nav onConversationsListItemClick={setCurrentConversationId} conversations={user.conversations} />
      {currentConversationId
        ? <ConversationContainer conversationId={currentConversationId} />
        : <div className="logo">qwe</div>}
    </div>
  );
};

export default Root;
