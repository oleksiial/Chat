import './Root.css';

import React, { useState } from 'react';
import ConversationContainer from '../../containers/ConversationContainer';
import useMessageSubscription from '../../hooks/useMessageSubscription';
import Nav from '../../components/Nav';
import useNewConversationSubscription from '../../hooks/useNewConversationSubscription';
import useConversationLabel from '../../hooks/useConversationLabel';

const Root = ({ user }) => {
  const [currentConversationId, setCurrentConversationId] = useState(null);
  useMessageSubscription(user.conversations.map((c) => c.id));
  useNewConversationSubscription();
  useConversationLabel();

  return (
    <div className="rootWrapper">
      <Nav
        onConversationsListItemClick={setCurrentConversationId}
        conversations={user.conversations}
        currentConversationId={currentConversationId}
      />
      {currentConversationId
        ? <ConversationContainer conversationId={currentConversationId} />
        : <div className="logo">qwe</div>}
    </div>
  );
};

export default Root;
