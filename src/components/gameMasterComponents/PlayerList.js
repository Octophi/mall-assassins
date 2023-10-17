import React from 'react';
import { Box, Heading, Text, Flex, Button } from '@chakra-ui/react';
import PlayerCard from './PlayerCard.js';
import { getPlayersByAliveStatus } from '../../firebase/database.js';

const PlayerList = ({ isAlive }) => {
  const playerList = getPlayersByAliveStatus(isAlive);

  const getTitle = () => {
    const playerAnnotation = (isAlive) ? "Live" : "Dead";
    return `${playerAnnotation} Players (${playerList ? playerList.size : 0})`;
  }

  return (
    <Box bg="gray.100" p={4} borderRadius="md" mb={3}>
      <Heading size="md">{getTitle}</Heading>
      {(playerList && playerList.length > 0) ? 
          playerList.map((player) => (
          <PlayerCard playerObject={player}/>
          )) :
          <p> No players to display</p>
      }
    </Box>
  );
};


export default PlayerList;
