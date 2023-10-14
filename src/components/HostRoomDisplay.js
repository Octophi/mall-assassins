import React from 'react';
import { useParams } from 'react-router-dom';

const HostRoomDisplay = () => {
  const { roomId } = useParams(); // Use useParams to access route parameters

  return (
    <div>
      <h1>Room ID: {roomId}</h1>
      <h2>Role: Host</h2>
    </div>
  );
};

export default HostRoomDisplay;
