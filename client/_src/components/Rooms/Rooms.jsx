import React from 'react';
import './Rooms.scss';

const Room = ({ label, isActive, onClick }) => (
  <div className={`room ${isActive && 'active'}`} onClick={onClick}>
    {label}
  </div>
);

const Rooms = ({ rooms, currentRoom, onSelect }) => {
  return (
    <div className="rooms">
      {Object.keys(rooms).map(roomId => {
        const { id, label } = rooms[roomId];
        return (
          <Room key={id} label={label} isActive={currentRoom === id} onClick={() => onSelect(id)} />
        );
      })}
    </div>
  );
};

export default Rooms;
