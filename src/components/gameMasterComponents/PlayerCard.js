import React from 'react';
import { Text, Flex, Button } from '@chakra-ui/react';

// Takes in playerObject as JSON object
const PlayerCard = (playerObject) => {
    return (
        <Flex justify="space-between" mt={2}>
            <Text fontSize="sm">{playerObject.playerName}</Text>
        </Flex>
    );
}

export default PlayerCard;