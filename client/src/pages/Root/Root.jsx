import './Root.css';

import React, { useState } from 'react';
import ConversationContainer from '../../containers/ConversationContainer';
import useMessageSubscription from '../../hooks/useMessageSubscription';
import useNewConversationSubscription from '../../hooks/useNewConversationSubscription';
import useConversationLabel from '../../hooks/useConversationLabel';
import NavContainer from '../../containers/NavContainer';
import HeaderContainer from '../../containers/HeaderContainer';

const Root = () => {
  const [currentConversationId, setCurrentConversationId] = useState(null);
  useMessageSubscription();
  useNewConversationSubscription();
  useConversationLabel();

  return (
    <div className="rootWrapper">
      <HeaderContainer />
      <NavContainer
        onConversationsListItemClick={setCurrentConversationId}
        currentConversationId={currentConversationId}
      />
      {currentConversationId
        ? <ConversationContainer conversationId={currentConversationId} />
        : <div className="logo">Logo</div>}
    </div>
  );
};

export default Root;
