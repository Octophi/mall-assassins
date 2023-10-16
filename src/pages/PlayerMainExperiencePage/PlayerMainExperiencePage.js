import React from 'react';
import './PlayerMainExperience.css';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Flex } from '@chakra-ui/react'

const TargetCard = ({ title, description, navigate, roomId, playerName, playerId }) => {

  const handleButtonClick = () => {
    // Append a route to the current URL and navigate to the new URL
    navigate(`/submit`); // This will append '/new-route' to the current URL
  };

  return (
    <div className="card">
      <h2>{title}</h2>
      <p>{description}</p>
      <button onClick={handleButtonClick}>View Target Details</button>
    </div>
  );
};

const TaskCard = ({ title, description, navigate, roomId, playerName, playerId }) => {

  const handleButtonClick = () => {
    // Append a route to the current URL and navigate to the new URL
    navigate(`/rooms/${roomId}/${playerName}/${playerId}/play/submit`);// This will append '/new-route' to the current URL
  };

  return (
    <div className="card">
      <h2>{title}</h2>
      <p>{description}</p>
      <button onClick={handleButtonClick}>View Target Details</button>
    </div>
  );
};

const PlayerMainExperiencePage = () => {
  const navigate = useNavigate();
  const { roomID } = useParams(); // Use useParams to access route parameters
  const { playerName } = useParams();
  const { playerID } = useParams();

  return (
    <Flex direction="column" align="center" justify="center" height="100vh">
      <Box>
        <div className="task-card">
          <TaskCard title="Main Task" description="Task" navigate={navigate} roomId={roomID} playerName={playerName} playerId={playerID} />
        </div>
        <div className="bottom-target-cards">
          <TargetCard title="Target 1" description="Content for Target 1" navigate={navigate} roomId={roomID} playerName={playerName} playerId={playerID} />
          <TargetCard title="Target 2" description="Content for Target 2" navigate={navigate} roomId={roomID} playerName={playerName} playerId={playerID} />
        </div>
      </Box>
    </Flex>
  );
};

export default PlayerMainExperiencePage;