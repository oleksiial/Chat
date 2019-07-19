import './App.scss';
import React, { useEffect, useReducer } from 'react';

import ChatMessages from '../ChatMessages';
import Input from '../Input';
import Rooms from '../Rooms';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const GET_USER = gql`
  {
    user(id: 1) {
      id
      name
      conversations {
        id
        label
        lastMessage {
          id
          sender {
            id
            name
          }
          text
        }
      }
    }
  }
`;

const initialState = {
  rooms: {},
  currentRoom: null,
  user: null,
  users: []
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...initialState, user: action.payload };
    case 'SET_ROOMS':
      return { ...state, rooms: action.payload };
    case 'SELECT_ROOM':
      return { ...state, currentRoom: action.payload };
    case 'RECEIVE_MESSAGE':
      console.log(action.payload);
      return {
        ...state,
        rooms: {
          ...state.rooms,
          [action.payload.conversation]: {
            ...state.rooms[action.payload.conversation],
            messages: [...state.rooms[action.payload.conversation].messages, action.payload]
          }
        }
      };
    default:
      throw new Error('unknown action: ' + action.type);
  }
};

// const fetchUser = id => fetch(`http://localhost:3001/user/${id}`).then(res => res.json());
// const fetchConversations = id =>
//   fetch(`http://localhost:3001/user/${id}/conversations`).then(res => res.json());
// const fetchMessages = id => fetch(`http://localhost:3001/messages/${id}`).then(res => res.json());

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleRoomSelection = id => {
    dispatch({ type: 'SELECT_ROOM', payload: id });
  };

  // const onConnected = async id => {
  //   const user = await fetchUser(id);
  //   dispatch({ type: 'SET_USER', payload: user });
  //   console.log(user);
  //   let rooms = await fetchConversations(id);
  //   const results = rooms.map(async room => {
  //     const messages = await fetchMessages(room.id);
  //     return {
  //       ...room,
  //       messages: messages.map(message => ({
  //         id: message.id,
  //         text: message.text,
  //         sender: message.sender_id
  //       }))
  //     };
  //   });
  //   Promise.all(results).then(res => {
  //     const roomsWithMessages = res.reduce((acc, i) => ({ ...acc, [i.id]: { ...i } }), {});
  //     dispatch({ type: 'SET_ROOMS', payload: roomsWithMessages });
  //   });
  // };

  // useEffect(() => {
  //   socket.on('message', message => dispatch({ type: 'RECEIVE_MESSAGE', payload: message }));
  //   // socket.on('joined', roomId => {
  //   //   setRooms(rooms => ({ ...rooms, [roomId]: { id: roomId, messages: [] } }));
  //   //   setCurrentRoom(roomId);
  //   // });
  //   socket.on('id', id => onConnected(id));
  //   return () => socket.disconnect();
  // }, []);

  const handleSend = message => {
    // sendMessage(state.user.id, message, state.currentRoom);
  };

  console.log(state);

  return (
    <Query query={GET_USER}>
      {({ loading, error, data }) => {
        console.log(data);
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;
        dispatch({ type: 'SET_USER', payload: { id: data.user.id, name: data.user.name } });
        return (
          <div className="app">
            {state.user && <p>User: {state.user.name}</p>}
            <div className="content">
              <Rooms
                rooms={state.rooms}
                currentRoom={state.currentRoom}
                onSelect={handleRoomSelection}
              />
              {state.currentRoom && (
                <section>
                  <ChatMessages messages={state.rooms[state.currentRoom].messages} />
                  <Input onSubmit={handleSend} label="Send" />
                </section>
              )}
            </div>
          </div>
        );
      }}
    </Query>
  );
};

export default App;
