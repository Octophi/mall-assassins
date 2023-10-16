import React, { useState } from 'react';
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

  // Function to move a player from the alive list to the dead list
  const movePlayerToDead = (playerName) => {
    setAlivePlayers(alivePlayers.filter((player) => player !== playerName));
    setDeadPlayers([...deadPlayers, playerName]);
  };

  return (
    <Flex direction="column" p={5}>
      <Flex justify="space-between" alignItems="center" mb={5}>
        <Heading size="lg">Mall Assassins</Heading>
        <Flex alignItems="center">
          <Input placeholder="Enter URL" size="sm" maxWidth="300px" mr={2} />
          <Button colorScheme="red">End Game</Button>
        </Flex>
      </Flex>

      <Flex>
        <Stack spacing={4} width="30%">
          <Box bg="teal.50" p={4} borderRadius="md">
            <Heading size="md">Active Tasks</Heading>
            <Text fontSize="sm">Manage game tasks here.</Text>
          </Box>
          <Box bg="teal.50" p={4} borderRadius="md">
            <Heading size="md">Task Bank</Heading>
            <Button as={Link} to="/tasks" colorScheme="teal" size="sm">
              Back To Tasks
            </Button>
          </Box>
        </Stack>

        <Flex direction="column" width="65%" ml={6}>
          <Box bg="gray.100" p={4} borderRadius="md" mb={5}>
            <Heading size="md">Mall Assassins</Heading>
            <Text fontSize="sm" mt={4}>
              Manage your game title and image here.
            </Text>
            <Flex mt={4}>
              <Button colorScheme="red" size="sm" mr={2}>
                Deny
              </Button>
              <Button colorScheme="green" size="sm">
                Approve
              </Button>
            </Flex>
          </Box>

          <Flex direction="column">
            <PlayerList
              title={`Alive Players (${alivePlayers.length})`}
              players={alivePlayers}
              taskCount={1}
              onPlayerDeath={movePlayerToDead}
            />
            <Divider mt={3} />
            <PlayerList
              title={`Dead Players (${deadPlayers.length})`}
              players={deadPlayers}
              taskCount={1}
            />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

const PlayerList = ({ title, players, taskCount, onPlayerDeath }) => (
  <Box bg="gray.100" p={4} borderRadius="md" mb={3}>
    <Heading size="md">{title}</Heading>
    {players.map((player, index) => (
      <Flex key={index} justify="space-between" mt={2}>
        <Text fontSize="sm">{player}</Text>
        {onPlayerDeath && (
          <Button
            colorScheme="red"
            size="sm"
            onClick={() => onPlayerDeath(player)}
          >
            Kill
          </Button>
        )}
      </Flex>
    ))}
  </Box>
);

export default GameMasterBoard;
