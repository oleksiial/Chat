import { useApolloClient } from "@apollo/react-hooks"
import { fragmentUser } from "../requests";
import useAuth from "./useAuth";

const useConversationLabel = () => {
  const { user: { id } } = useAuth();
  const client = useApolloClient();

  const prev = client.readFragment({
    id: `User:${id}`,
    fragment: fragmentUser,
  });

  const labeledConversations = prev.conversations.map(conversation => {
    const label = conversation.type === 'private'
      ? conversation.users.find(user => user.id !== id).username
      : conversation.label;
    return { ...conversation, label };
  })

  client.writeFragment({
    id: `User:${id}`,
    fragment: fragmentUser,
    data: { ...prev, conversations: labeledConversations },
  });
}

export default useConversationLabel;
