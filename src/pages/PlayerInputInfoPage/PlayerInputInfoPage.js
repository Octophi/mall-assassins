import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Flex, 
  Heading,
  FormControl,
  FormLabel,
  Input
 } from '@chakra-ui/react';
import { Form, useNavigate } from 'react-router-dom';
import { doesGameExist } from '../../firebase/database';

const PlayerInputInfoPage = () => {
  const [roomID, setRoomID] = useState('');
  const [playerName, setPlayerName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Check if the room ID exists in the database (implement this logic)
      const roomExists = await doesGameExist(roomID);
      if (roomExists) {
        // If the room ID exists, navigate to the AssassinGameLobby
        navigate(`/rooms/${roomID}/${playerName}`);

        //TODO: Check if the Name is unique to the Game
        //TODO: Inherent to this, change the activeGames database to be a db of struct Games or Rooms instead of just numbers. This change will affect the rest of code as well
      } else {
        console.error('Room Not Found');
      }
    } catch (error) {
      console.error("Error Checking Room:", error);
    }
  };

  return (
    <div>
      <Flex direction="column" align="center" justify="center" h="100vh">
        <Heading as="h1" size="xl" mb={4}>
          Information
        </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl mb={4}>
          <FormLabel htmlFor="roomID">Enter Room ID</FormLabel>
          <Input
            type="text"
            id="roomID"
            placeholder="roomID"
            value={roomID}
            onChange={(e) => setRoomID(e.target.value)}
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel htmlFor="playerName">Enter Your Name</FormLabel>
          <Input
            type="text"
            id="playerName"
            placeholder="Name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          />
        </FormControl>
        <Box textAlign="center" mb={4}>
          <Button type="submit" colorScheme="teal">
            Join Room
          </Button>
        </Box>
      </form>
      </Flex>
    </div>
  );
};

export default PlayerInputInfoPage;
