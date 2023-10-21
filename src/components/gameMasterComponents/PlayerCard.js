import { Card, Text } from '@chakra-ui/react';
import React from 'react';

// Takes in playerObject as JSON object
// Note the playerObject.playerObject logic is nonsense but it's necessary and I will fix this one day
const PlayerCard = (playerObject) => {
    return (
        <Card p={4} m={4}>
            <Text fontSize="sm">{playerObject.playerObject.playerName}</Text> 
        </Card>
    );
}

export default PlayerCard;