import React, { useState } from 'react';
import { graphql } from 'react-apollo';

import { GET_USER } from '../../requests';
import Messages from '../Messages';
import ConversationsList from '../../components/ConversationsList';

const User = ({ id, name }) => (
  <div>
    <p>
      {id}: {name}
    </p>
  </div>
);

const App = ({ data }) => {
  const [currentConversationId, setCurrentConversationId] = useState(null);
  const { loading, error, user } = data;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { conversations } = user;
  return (
    <div className="app">
      {/* <User id={user.id} name={user.name} /> */}
      <ConversationsList conversations={conversations} onClick={setCurrentConversationId} />
      {currentConversationId && <Messages conversationId={currentConversationId} />}
    </div>
  );
};

export default graphql(GET_USER, { options: { variables: { id: 1 } } })(App);

// const _App = () => {
//   const [currentConv, setCurrentConv] = useState(null);
//   return (
//     <Query query={GET_USER}>
//       {({ loading, error, data }) => {
//         if (loading) return <p>Loading...</p>;
//         if (error) return <p>Error: {error.message}</p>;
//         return (
//           <div>
//             <User id={data.user.id} name={data.user.name} />
//             {data.user.conversations.map(c => (
//               <ConversationListItem
//                 key={c.id}
//                 id={c.id}
//                 label={c.label}
//                 lastMessage={c.lastMessage}
//                 onClick={setCurrentConv}
//               />
//             ))}

//             {currentConv && (
//               <>
//                 <ApolloConsumer>
//                   {client => (
//                     <Mutation
//                       mutation={SEND_MESSAGE}
//                       update={(cache, { data: { createMessage } }) => {
//                         const { messages } = cache.readQuery({
//                           query: GET_MESSAGES,
//                           variables: { conversationId: currentConv }
//                         });
//                         cache.writeQuery({
//                           query: GET_MESSAGES,
//                           variables: { conversationId: currentConv },
//                           data: { messages: messages.concat([createMessage]) }
//                         });
//                       }}
//                       onCompleted={({ createMessage }) => {
//                         const { user } = client.readQuery({ query: GET_USER });
//                         client.writeQuery({
//                           query: GET_USER,
//                           data: {
//                             user: {
//                               ...user,
//                               conversations: [
//                                 ...user.conversations.map(c => ({
//                                   ...c,
//                                   lastMessage: c.id === currentConv ? createMessage : c.lastMessage
//                                 }))
//                               ]
//                             }
//                           }
//                         });
//                       }}
//                     >
//                       {createMessage => (
//                         <SendMessage
//                           senderId={data.user.id}
//                           conversationId={currentConv}
//                           onSend={createMessage}
//                         />
//                       )}
//                     </Mutation>
//                   )}
//                 </ApolloConsumer>
//                 <Query query={GET_MESSAGES} variables={{ conversationId: currentConv }}>
//                   {({ loading, error, data }) => {
//                     if (loading) return <p>Loading...</p>;
//                     if (error) return <p>Error: {error.message}</p>;
//                     return data.messages.map(m => (
//                       <Message key={m.id} text={m.text} sender={m.sender.id} />
//                     ));
//                   }}
//                 </Query>
//               </>
//             )}
//           </div>
//         );
//       }}
//     </Query>
//   );
// };
