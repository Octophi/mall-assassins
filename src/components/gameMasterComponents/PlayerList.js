import React from 'react';
import { Box, Heading, Text, Flex, Button } from '@chakra-ui/react';

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

export default PlayerList;
