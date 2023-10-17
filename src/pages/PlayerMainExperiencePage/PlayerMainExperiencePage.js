import React, { useState, useEffect } from 'react';
import './PlayerMainExperience.css';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Flex, Alert, AlertIcon } from '@chakra-ui/react'
import ObjectiveCard from '../../components/ObjectiveCard/ObjectiveCard.js';
import { useAppContext } from '../../AppContext';
import BasicModal from '../../components/PopUp/PopUp';


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
          <ObjectiveCard isTask={true} fullWidth={true} bgColor="blue.100" title="TODO: Task Description Here" content={'Points: ' + 10} handleOnClick={handleButtonClick} />
        </div>
        <div className="bottom-target-cards">
          <ObjectiveCard isTask={false} fullWidth={false} bgColor="green.100" title="Isaiah Bernardino" content={'Points: ' + 260} handleOnClick={handleButtonClick} />
          <ObjectiveCard isTask={false} fullWidth={false} bgColor="yellow.100" title="EJ Robinson" content={'Points: ' + 20git0} handleOnClick={handleButtonClick} />
        </div>
      </Box>
        <BasicModal modalHeader="Isaiah's Glorious Work" modalBody="Great Work Isaiah"/>
    </Flex>
  );
};

export default PlayerMainExperiencePage;