import React from 'react';
import {
    Card,
    Text
  } from '@chakra-ui/react';


function TaskCard({title, index}) {

    return (
        <Card>
            <Text key={index}>{title}</Text>
        </Card>
    )
}

export default TaskCard;