import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Flex, 
  Heading,
  FormControl,
  FormLabel,
  Input, 
  Image
 } from '@chakra-ui/react';
import { Form, useNavigate } from 'react-router-dom';
import { doesGameExist, getGameByRoomKey, updateGame } from '../../firebase/database';
import { useParams } from 'react-router-dom';
import { ErrorModal } from '../../components/ErrorModal';

import { v4 as uuidv4 } from 'uuid';
import { set } from '@firebase/database';

const HostInputInfoPage = () => {
  const { roomID } = useParams();
  const [playerName, setPlayerName] = useState('');
  const [error, setError] = useState('');
  const [isErrorModalOpen, setIsErrorModalOpen] = useState('');
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
          const hostID = uuidv4();

          const playerData = {
            playerId: hostID, 
            playerName: playerName,   
          }
          //Add player to be the Host of Game in Backend
          const gameData = {
            hostID: hostID,
          }
          updateGame(roomID, gameData);

          // If the room ID exists, navigate to the AssassinGameLobby
          navigate(`/rooms/${roomID}/${hostID}`);
        } else {
          setError('Room Status is now:' + roomStatus);
          setIsErrorModalOpen(true);
          console.error('Room Status is now:', roomStatus);
        }
      } else {
        setError('Room Not Found');
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
      <Flex justify="space-between" alignItems="center" mb={5}>
      <Image src="/logo.png" alt="Mall Assassins Logo" boxSize="50px" objectFit="contain" />
    </Flex>
        <Heading as="h1" size="xl" mb={4}>
          Information
        </Heading>
      <form onSubmit={handleSubmit}>
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
            Create Room
          </Button>
        </Box>
      </form>
      </Flex>
    </div>
  );
};

export default HostInputInfoPage;
