import React from 'react';
import { Box, Button, Card, CardBody, Heading, Text } from '@chakra-ui/react';

const TaskCard = ({ bgColor, taskDescription, points, taskID, handleOnClick }) => {

  return (
    <Box
      width="100%"
      height="100%"
    >
      <Card width="100%" height="100%" textAlign="center">
        <Button bg={bgColor} onClick={handleOnClick} width="100%" height="100%" p={0}>
          <CardBody>
            <Heading as="h2" size="md">
              {taskDescription}
            </Heading>
            <Text mt="2">Task</Text>
            <Text mt="2">Points: {points}</Text>
          </CardBody>
        </Button>
      </Card>
    </Box >
  );
}

export default TaskCard;