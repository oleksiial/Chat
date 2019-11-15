import './Root.css';

import React, { useState } from 'react';
import ConversationContainer from '../../containers/ConversationContainer';
import useMessageSubscription from '../../hooks/useMessageSubscription';
import useNewConversationSubscription from '../../hooks/useNewConversationSubscription';
import NavContainer from '../../containers/NavContainer';
import HeaderContainer from '../../containers/HeaderContainer';
import FakeConversationContainer from '../../containers/FakeConversationContainer';

const Root = () => {
  const [currentConversationId, setCurrentConversationId] = useState(null);
  useMessageSubscription();
  useNewConversationSubscription();

  const ConvContainer = currentConversationId < 0
    ? FakeConversationContainer
    : ConversationContainer;

  return (
    <div className="rootWrapper">
      <HeaderContainer />
      <NavContainer
        onConversationsListItemClick={setCurrentConversationId}
        currentConversationId={currentConversationId}
      />
      {currentConversationId !== null
        ? <ConvContainer conversationId={currentConversationId} setCurrentConversationId={setCurrentConversationId} />
        : <div className="logo">Logo</div>}
    </div>
  );
};

export default Root;
