import React from 'react';
import { Button, Flex, Heading } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook for navigation
import generateRoomKey from '../utils/gameUtils';
import { createGame } from '../firebase/database';

const LandingPage = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleCreateGame = () => {
    const roomId = generateRoomKey();
    const gameData = {
      roomId,
      active: true,
    };

    try {
      // Create the game in the database
      createGame(roomId, gameData);
      console.log('Room created');

      // Redirect to the newly created room
      navigate(`/rooms/${roomId}`);
    } catch (error) {
      console.error('Error in creating game:', error);
    }
  };

  return (
    <Flex direction="column" align="center" justify="center" h="100vh">
      <Heading as="h1" size="xl" mb={4}>
        Welcome to Mall Assassins!
      </Heading>
      <Button colorScheme="blue" size="lg" mb={4}>
        Join a Room
      </Button>
      <Button colorScheme="green" size="lg" onClick={handleCreateGame}>
        Host a Room
      </Button>
    </Flex>
  );
};

export default LandingPage;
