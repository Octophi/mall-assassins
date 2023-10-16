import React from 'react';
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
import { ActiveTasks } from '../components/gameMasterComponents/ActiveTasks.js'

const GameMasterBoard = () => {
  const { roomID } = useParams();

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
            <Heading size="md">Game Title</Heading>
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
            <PlayerList title="Alive Players (5)" playerCount={5} taskCount={1} />
            <Divider mt={3} />
            <PlayerList title="Dead Players (12)" playerCount={12} taskCount={1} />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

const PlayerList = ({ title, playerCount, taskCount }) => (
  <Box bg="gray.100" p={4} borderRadius="md" mb={3}>
    <Heading size="md">{title}</Heading>
    <Text fontSize="sm" mt={2}>
      {playerCount === 1 ? '• 1 Player' : `• ${playerCount} Players`}
    </Text>
  </Box>
);

export default GameMasterBoard;