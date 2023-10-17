import React, { useState, useEffect } from 'react';
import {
  Flex,
  Heading,
  Button,
  Text,
  Stack,
  Box,
  Center
} from '@chakra-ui/react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getGameByRoomKey, updateGameStatus } from '../../firebase/database';

const HostWaitingRoom = () => {
  const { roomID } = useParams();
  const [roomData, setRoomData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const roomSnapshot = await getGameByRoomKey(roomID);
        if (roomSnapshot.exists()) {
          setRoomData(roomSnapshot.val());
        } else {
          console.error('Room not found');
        }
      } catch (error) {
        console.error('Error fetching room data:', error);
      }
    };

    fetchRoomData();
  }, [roomID]);

  const handleStartGame = () => {
    updateGameStatus(roomID, "Active");
    navigate(`/game-master-board`);
  };

  return (
    <Flex direction="column" p={5}>
      <Flex justify="space-between" alignItems="center" mb={5}>
        <Heading size="md">Mall Assassins Logo</Heading>
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
          {roomData && roomData.playerNames && roomData.playerNames.map((playerName, index) => (
            <Text key={index}>{playerName}</Text>
          ))}
        </Box>
      </Stack>
    </Flex>
  );
};

export default HostWaitingRoom;






