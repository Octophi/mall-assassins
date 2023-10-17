import React, { useState, useEffect } from 'react';
import './PlayerMainExperience.css';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Flex, Alert, AlertIcon } from '@chakra-ui/react'
import TargetCard from '../../components/TargetCard/TargetCard.js';
import { useAppContext } from '../../AppContext';
import BasicModal from '../../components/PopUp/PopUp';

const TaskCard = ({ title, description, navigate, roomId, playerName, playerId }) => {

  return (
    <div className="card">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};

const PlayerMainExperiencePage = () => {
  const navigate = useNavigate();
  const { setPendingStatus, isSubmissionPending } = useAppContext();
  const { roomID } = useParams(); // Use useParams to access route parameters
  const { playerName } = useParams();
  const { playerID } = useParams();
  const [showAlert, setShowAlert] = useState(false);
  console.log(isSubmissionPending)

  useEffect(() => {
    // Show the alert when isSubmissionPending becomes true
    if (isSubmissionPending) {
      setShowAlert(true);

      // Automatically hide the alert after 1.5 seconds
      const timeoutId = setTimeout(() => {
        setShowAlert(false);
      }, 1500);

      // Clear the timeout when the component unmounts or when isSubmissionPending becomes false
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [isSubmissionPending]);

  // Regardless of what button I click, I want the following behavior
  const handleButtonClick = () => {
    setPendingStatus(false)
    // Append a route to the current URL and navigate to the new URL
    navigate(`/rooms/${roomID}/${playerName}/${playerID}/play/submit`);
  };

  return (
    <Flex direction="column" align="center" justify="center" height="100vh">
      {showAlert && (<div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999, // Ensure the alert is on top of other elements
        }}
      >
        <Alert status="success" mb={4} style={{ position: 'fixed', top: 0, width: '100%'}}>
          <AlertIcon />
          Image submission is pending!
        </Alert></div>
      )}
      <Box>
        <div className="task-card">
          <TaskCard title="Main Task" description="Task" navigate={navigate} roomId={roomID} playerName={playerName} playerId={playerID} />
        </div>
        <div className="bottom-target-cards">
          <TargetCard title="Target 1" content="Content for Target 1" handleOnClick={handleButtonClick} />
          <TargetCard title="Target 2" content="Content for Target 2" handleOnClick={handleButtonClick} />
        </div>
      </Box>
        <BasicModal modalHeader="Isaiah's Glorious Work" modalBody="Great Work Isaiah"/>
    </Flex>
  );
};

export default PlayerMainExperiencePage;