import React, { useState } from 'react';
import CreateTask from '../components/gameMasterComponents/CreateTask';
import {
  Flex,
  Heading,
  Button,
  Box,
  Input,
  Stack,
  Text,
  Avatar,
  Spacer,
  Divider,
  AvatarGroup,
  Image
} from '@chakra-ui/react';
import { Link, useParams } from 'react-router-dom';
import { ActiveTasks } from '../components/gameMasterComponents/ActiveTasks.js'
import PlayerList from '../components/gameMasterComponents/PlayerList';

const GameMasterBoard = () => {
  const { roomID } = useParams();

  const [alivePlayers, setAlivePlayers] = useState([
    'Player 1',
    'Player 2',
    'Player 3',
  ]);
  const [deadPlayers, setDeadPlayers] = useState([]);

  // Function to eliminate a player from the game
  const eliminatePlayer = (playerName) => {
    setAlivePlayers(alivePlayers.filter((player) => player !== playerName));
    setDeadPlayers([...deadPlayers, playerName]);
  };

  return (
    <Flex direction="column" p={5}>
      <Flex justify="space-between" alignItems="center" mb={5}>
      <Image src="/logo.png" alt="Mall Assassins Logo" boxSize="50px" objectFit="contain" />
      <Flex alignItems="center">
        <Button colorScheme="red">End Game</Button>
      </Flex>
    </Flex>

      <Flex>
        <Box flex={1} p={4}>
          <Stack spacing={4}>
            <Box bg="teal.50" p={4} borderRadius="md">
              <Heading size="md">Active Missions</Heading>
              <ActiveTasks />
            </Box>
            <Box bg="teal.50" p={4} borderRadius="md">
              <Heading size="sm" >Task Bank </Heading>
              <CreateTask />
              {/* <Button as={Link} to="/tasks" colorScheme="teal" size="sm">Back To Tasks</Button> */}
              {/* Add task bank UI components here */}
            </Box>
          </Stack>
        </Box>

        <Box flex={1.5} p={4}>
          <Box bg="gray.100" p={4} borderRadius="md" mb={5}>
            <Heading size="md">Mall Assassins Command Center</Heading>
            <Text fontSize="sm" mt={4}>
              Manage the title and visuals of your top-secret mission.
            </Text>
            <Flex mt={4}>
              <Button colorScheme="red" size="sm" mr={2}>
                Abort
              </Button>
              <Button colorScheme="green" size="sm">
                Execute
              </Button>
            </Flex>
          </Box>
        </Box>

        <Box flex={1} p={4}>
            <PlayerList
              isAlive={true}
            />
            <Divider mt={3} />
            <PlayerList
              isAlive={false}
            />
        </Box>
      </Flex>
    </Flex>
  );
};

export default GameMasterBoard;
