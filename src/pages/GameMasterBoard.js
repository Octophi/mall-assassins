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
} from '@chakra-ui/react';
import { Link, useParams } from 'react-router-dom';

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
        <Heading size="lg">Mall Assassins </Heading>
        <Flex alignItems="center">
          <Input placeholder="Enter URL" size="sm" maxWidth="300px" mr={2} />
          <Link to="/">
            <Button colorScheme="red">
              End the Game
            </Button>
          </Link>
        </Flex>
      </Flex>

      <Flex>
        <Stack spacing={4} width="30%">
          <Box bg="teal.50" p={4} borderRadius="md">
            <Heading size="md">Active Missions</Heading>
            <Text fontSize="sm">Strategize and manage your covert missions.</Text>
          </Box>
          <Box bg="teal.50" p={4} borderRadius="md">
            <Heading size="sm">Task Bank</Heading>
            <CreateTask />
            {/* <Button as={Link} to="/tasks" colorScheme="teal" size="sm">Back To Tasks</Button> */}
            {/* Add task bank UI components here */}
          </Box>
        </Stack>

        <Flex direction="column" width="65%" ml={6}>
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

          <Flex direction="column">
            <PlayerList
              title={`Operatives in Play (${alivePlayers.length})`}
              players={alivePlayers}
              missionCount={1}
              onEliminatePlayer={eliminatePlayer}
            />
            <Divider mt={3} />
            <PlayerList
              title={`Operatives Eliminated (${deadPlayers.length})`}
              players={deadPlayers}
              missionCount={1}
            />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

const PlayerList = ({ title, players, missionCount, onEliminatePlayer }) => (
  <Box bg="gray.100" p={4} borderRadius="md" mb={3}>
    <Heading size="md">{title}</Heading>
    <AvatarGroup size="md" max={4}>
      {players.map((player, index) => (
        <Avatar key={index} name={player} src="#" />
      ))}
    </AvatarGroup>
    {players.map((player, index) => (
      <Flex key={index} justify="space-between" mt={2}>
        <Text fontSize="sm">{player}</Text>
        {onEliminatePlayer && (
          <Button
            colorScheme="red"
            size="sm"
            onClick={() => onEliminatePlayer(player)}
          >
            Eliminate
          </Button>
        )}
      </Flex>
    ))}
  </Box>
);

export default GameMasterBoard;
