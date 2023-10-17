import React from 'react';
import { useState, useEffect } from 'react';
import { Box, Heading, Text, Flex, Button } from '@chakra-ui/react';
import PlayerCard from './PlayerCard.js';
import { getPlayersByAliveStatus } from '../../firebase/database.js';

const PlayerList = ({ isAlive }) => {
  const [playerList, setPlayerList] = useState(null);
  const [title, setTitle] = useState('');

  useEffect(() => {
    const fetchPlayerList = async () => {
      try {
        const result = await getPlayersByAliveStatus(isAlive); // Call the function
        if (result !== null) {
          setPlayerList(result);
        }
      } catch (error) {
        // Handle errors as needed
        console.log("Error occurred while trying to retrieve player list: " + error);
      }
    };

    fetchPlayerList();
  }, []); // Empty dependency array ensures this effect runs only once. TODO: Make this update when the database updates

  const getTitle = () => {
    const playerAnnotation = isAlive ? 'Live' : 'Dead';
    return `${playerAnnotation} Players (${playerList ? playerList.length : 0})`;
  };

  useEffect(() => {
    // Run getTitle when playerList changes
    setTitle(getTitle());
  }, [playerList]);

  return (
    <Box bg="gray.100" p={4} borderRadius="md" mb={3}>
      <Heading size="md">{title}</Heading>
      {(playerList && playerList.length > 0) ? 
          playerList.map((player, index) => (
          <PlayerCard key={index} playerObject={player}/>
          )) :
          <p> No players to display</p>
      }
    </Box>
  );
};


export default PlayerList;
