import React from 'react';
import {
  Flex,
  Heading, 
  Button
} from '@chakra-ui/react';
import { Link, useParams } from 'react-router-dom';

const HostWaitingRoom = () => {
  const { roomID } = useParams(); // Use useParams to access route parameters
  //TODO: Add more stuff as per Figma
  return (
    <div>
      <Flex direction="column" align="center" justify="center" h="100vh">
        <Heading as="h1" size="xl" mb={4}>
          Room ID: {roomID}
        </Heading>
        <Heading as="h2" size="xl" mb={4}>
          Role: Host
        </Heading>
        <Link to="/game-master-board">
          <Button colorScheme="teal">
            Game Master Board
          </Button>
        </Link>
      </Flex>
    </div>
  );
};

export default HostWaitingRoom;
