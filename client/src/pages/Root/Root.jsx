import './Root.css';

import React, { useState } from 'react';
import ConversationsList from '../../components/ConversationsList/ConversationsList';
import ConversationContainer from '../../containers/ConversationContainer';
import useMessageSubscription from '../../hooks/useMessageSubscription';

const Root = ({ user }) => {
  const [currentConversationId, setCurrentConversationId] = useState(null);
  useMessageSubscription();

  return (
    <div className='rootWrapper'>
      <ConversationsList
        conversations={user.conversations}
        onConversationsListItemClick={setCurrentConversationId}
      />
      {currentConversationId && <ConversationContainer conversationId={currentConversationId} />}
    </div>
  );
};

export default Root;
