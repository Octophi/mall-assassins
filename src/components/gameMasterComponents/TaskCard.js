import React from 'react';
import {
    Card,
    Text
  } from '@chakra-ui/react';


function TaskCard({title, index}) {

    return (
        <Card p={4} m={4}>
            <Text key={index}>{title}</Text>
        </Card>
    )
}

export default TaskCard;