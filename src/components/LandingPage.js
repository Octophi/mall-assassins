import React from 'react';
import { Button, Flex, Heading, Image } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook for navigation
import generateRoomKey from '../utils/gameUtils';
import { createGame } from '../firebase/database';

const LandingPage = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleCreateGame = () => {
    const roomId = generateRoomKey();
    const gameData = {
      roomId,
      roomStatus: "Waiting",
      hostID: null,
      playerIDs: [],
      playerNames: [],
    };

    try {
      // Create the game in the database
      createGame(roomId, gameData);
      console.log('Room created');

      // Redirect to the newly created room
      navigate(`/rooms/${roomId}/game-master-info`);
    } catch (error) {
      console.error('Error in creating game:', error);
    }
  };

  const handleJoinGame = () => {
    try {
      navigate('/join-room');
    } catch (error) {
      console.error('Error in Attempting to Join Room:', error);
    }
  }

  return (
    <Flex direction="column" align="center" justify="center" h="100vh">
      <Flex justify="space-between" alignItems="center" mb={5}>
      <Image src="/logo.png" alt="Mall Assassins Logo" boxSize="50px" objectFit="contain" />
    </Flex>
      <Heading as="h1" size="xl" mb={4}>
        Welcome to Mall Assassins!
      </Heading>
      <Button colorScheme="blue" size="lg" mb={4} onClick={handleJoinGame}>
        Join a Room
      </Button>
      <Button colorScheme="green" size="lg" onClick={handleCreateGame}>
        Host a Room
      </Button>
    </Flex>
  );
};

export default LandingPage;