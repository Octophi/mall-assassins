import React from 'react';
import {
  Flex,
  Heading,
  Button,
  Box,
  Input,
  Stack,
  Text
} from '@chakra-ui/react';
import { Link, useParams } from 'react-router-dom';

const GameMasterBoard = () => {
  const { roomID } = useParams();

  return (
    <Flex direction="column" p={5}>
      <Flex justify="space-between" alignItems="center" mb={5}>
        <Heading size="md">Mall Assassins Logo</Heading>
        <Flex>
          <Input placeholder="URL" size="sm" maxWidth="300px" mr={2} />
          <Button colorScheme="red">End Game</Button>
        </Flex>
      </Flex>

      <Flex>
        <Stack spacing={4} width="30%">
          <Box>
            <Heading size="sm">Active Tasks</Heading>
            {/* Add task list UI components here */}
          </Box>
          <Box>
            <Heading size="sm">Task Bank</Heading>
            <Button as={Link} to="/tasks" colorScheme="teal" size="sm">Back To Tasks</Button>
            {/* Add task bank UI components here */}
          </Box>
        </Stack>

        <Flex direction="column" justify="space-between" width="65%" ml={6}>
          <Box mb={5}>
            <Heading size="sm">Title</Heading>
            {/* Add title-related UI components here */}
            <Text mt={4}>Image</Text>
            {/* Add image UI components here */}
            <Flex mt={4}>
              <Button colorScheme="red" size="sm" mr={2}>Deny</Button>
              <Button colorScheme="green" size="sm">Approve</Button>
            </Flex>
          </Box>

          <Flex direction="column">
            <Box mb={3}>
              <Heading size="sm">Alive (5)</Heading>
              <Text mt={2}>• 1 Task</Text>
              {/* Add list of players that are alive here */}
            </Box>
            <Box>
              <Heading size="sm">Dead (12)</Heading>
              <Text>• 1 Task</Text>
              {/* Add list of players that are dead here */}
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default GameMasterBoard;
