import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Image,
  Stack,
  Text
} from '@chakra-ui/react';
import React from 'react';
import { ActiveTasks } from '../components/gameMasterComponents/ActiveTasks.js';
import CreateTask from '../components/gameMasterComponents/CreateTask';
import PlayerList from '../components/gameMasterComponents/PlayerList';

const GameMasterBoard = () => {
  
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
            </Box>
          </Stack>
        </Box>

        <Box flex={1.5} p={4}>
          <Box bg="gray.100" p={4} borderRadius="md" mb={5}>
            <Heading size="md">Mall Assassins Command Center</Heading>
            <Text fontSize="sm" mt={4}>
              Manage the title and visuals of your top-secret mission.
            </Text>
            <Flex mt={4} justify="center">
              <Button colorScheme="red" size="sm" mr={2}>
                Deny
              </Button>
              <Button colorScheme="green" size="sm">
                Approve
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
