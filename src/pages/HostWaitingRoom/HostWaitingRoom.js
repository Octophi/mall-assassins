import React, { useState, useEffect } from 'react';
import {
  Flex,
  Heading,
  Button,
  Text,
  Stack,
  Box,
  Center, 
  Image
} from '@chakra-ui/react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getGameByRoomKey, retrieveAllPlayers, updateGameStatus } from '../../firebase/database';

const HostWaitingRoom = () => {
  const { roomID } = useParams();
  const { hostID } = useParams();
  const [roomData, setRoomData] = useState(null);
  const [players, setPlayers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    const retrievePlayers = () => {
      retrieveAllPlayers(roomID, (players) => {
        setPlayers(players);
      });
    }
    retrievePlayers();
  }, [roomID, players]);

  const handleStartGame = () => {
    updateGameStatus(roomID, "Active");
    navigate(`/rooms/${roomID}/${hostID}/game-master-board`);
  };

  return (
    <Flex direction="column" p={5}>
      <Flex justify="space-between" alignItems="center" mb={5}>
      <Flex justify="space-between" alignItems="center" mb={5}>
      <Image src="/logo.png" alt="Mall Assassins Logo" boxSize="50px" objectFit="contain" />
    </Flex>
        <Flex>
          <Button colorScheme="green" onClick={handleStartGame}>
            Start Game
          </Button>
        </Flex>
      </Flex>

      <Box bg="teal" color="white" p={3} borderRadius="md" mb={2}>
        <Center>
          <Heading size="lg">Mall Assassins</Heading>
        </Center>
      </Box>

      <Box bg="teal" color="white" p={3} borderRadius="md" mb={2}>
        <Center>
          <Heading size="md">Role: Host</Heading>
        </Center>
      </Box>

      <Box bg="teal" color="white" p={3} borderRadius="md" mb={2}>
        <Center>
          <Heading size="md">Room ID: {roomID}</Heading>
        </Center>
      </Box>

      <Stack spacing={4} width="100%">
        <Box>
          <Heading size="md">Players:</Heading>
          {players && players.map((playerName, index) => (
            <Text key={index}>{playerName}</Text>
          ))}
        </Box>
      </Stack>
    </Flex>
  );
};

export default HostWaitingRoom;






