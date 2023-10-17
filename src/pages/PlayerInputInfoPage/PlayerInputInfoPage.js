import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Flex, 
  Heading,
  FormControl,
  FormLabel,
  Input,
  Text
 } from '@chakra-ui/react';
import { Form, useNavigate } from 'react-router-dom';
import { doesGameExist, getGameByRoomKey, addPlayer, createPlayer } from '../../firebase/database';
import ErrorModal from '../../components/ErrorModal';

import { v4 as uuidv4 } from 'uuid';

const PlayerInputInfoPage = () => {
  const [roomID, setRoomID] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [error, setError] = useState('');
  const [isErrorModalOpen, setIsErrorModalOpen] = useState('');
  const [nameTaken, setNameTaken] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Check if the room ID exists in the database (implement this logic)
      const roomExists = await doesGameExist(roomID);
      if (roomExists) {
        const room = await getGameByRoomKey(roomID);
        const roomStatus = await room.val().roomStatus.trim();
        if (roomStatus.localeCompare("Waiting") === 0) {
          const playerID = uuidv4();

          const playerData = {
            playerId: playerID, 
            playerName: playerName,
            isAlive: true   
          }
          // Add player, does checking already
          try {
            await addPlayer(roomID, playerName, playerID);
            await createPlayer(playerID, playerData);
            navigate(`/rooms/${roomID}/${playerName}/${playerID}`);
          } catch(error) {
            setNameTaken(true);
            console.log(error);
          }
        } else {
          setError('Room Status is now: ' + roomStatus);
          setIsErrorModalOpen(true);
          console.error('Room Status is now:', roomStatus);
        }
      } else {
        setError('Room not found');
        setIsErrorModalOpen(true);
        console.error('Room Not Found');
      }
    } catch (error) {
      setError('Error Checking Room: ' + error.message);
      setIsErrorModalOpen(true);
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
            onChange={(e) => {
              setPlayerName(e.target.value);
              setNameTaken(false);
            }}
          />
        </FormControl>
        {nameTaken && (
            <Text color="red">Name is already taken</Text>
        )}
        <Box textAlign="center" mb={4}>
          <Button type="submit" colorScheme="teal">
            Join Room
          </Button>
        </Box>
      </form>
      </Flex>
      <ErrorModal
        isOpen={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
        error={error}
      />
    </div>
  );
};

export default PlayerInputInfoPage;
