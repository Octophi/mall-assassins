import React, { useState, useEffect } from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
import PlayerCard from './PlayerCard.js';
import { getPlayersByAliveStatus } from '../../firebase/database.js';

const PlayerList = ({ isAlive }) => {
  const [playerList, setPlayerList] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    const playerAnnotation = isAlive ? 'Live' : 'Dead';

    // Set up a real-time listener for player data
    const unsubscribe = getPlayersByAliveStatus(isAlive, (updatedPlayers) => {
      setPlayerList(updatedPlayers);
      setTitle(`${playerAnnotation} Players (${updatedPlayers.length})`);
    });

    return () => {
      // Clean up the listener when the component unmounts
      unsubscribe();
    };
  }, [isAlive]);

  return (
    <Box bg="gray.100" p={4} borderRadius="md" mb={3}>
      <Heading size="md">{title}</Heading>
      {playerList.length > 0 ? (
        playerList.map((player, index) => (
          <PlayerCard key={index} playerObject={player} />
        ))
      ) : (
        <Text>No players to display</Text>
      )}
    </Box>
  );
};

export default PlayerList;
