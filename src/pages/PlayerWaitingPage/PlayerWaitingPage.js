import React from 'react';
import {
  Flex,
  Heading
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

const PlayerWaitingPage = () => {
  const { roomID } = useParams(); // Use useParams to access route parameters
  const { playerName } = useParams();
  //TODO: Add more info, show players in lobby
  
  return (
    <div>
      <Flex direction="column" align="center" justify="center" h="100vh">
        <Heading as="h1" size="xl" mb={4}>
          Room ID: {roomID}
        </Heading>
        <Heading as="h2" size="xl" mb={4}>
          Role: Player
        </Heading>
        <Heading as="h2" size="xl" mb={4}>
          Player Name: { playerName }
        </Heading>
      </Flex>
    </div>
  );
};

export default PlayerWaitingPage;
