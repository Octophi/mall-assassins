import React from 'react';
import { Text, Flex, Button } from '@chakra-ui/react';

// Takes in playerObject as JSON object
// Note the playerObject.playerObject logic is nonsense but it's necessary and I will fix this one day
const PlayerCard = (playerObject) => {
    return (
        <Flex justify="space-between" mt={2}>
            <Text fontSize="sm">{playerObject.playerObject.playerName}</Text> 
        </Flex>
    );
}

export default PlayerCard;