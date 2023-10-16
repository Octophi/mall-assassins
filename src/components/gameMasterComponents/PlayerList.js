import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

const PlayerList = ({ title, playerCount }) => (
  <Box bg="gray.100" p={4} borderRadius="md" mb={3}>
    <Heading size="md">{title}</Heading>
    <Text fontSize="sm" mt={2}>
      {playerCount === 1 ? '• 1 Player' : `• ${playerCount} Players`}
    </Text>
  </Box>
);

export default PlayerList;
