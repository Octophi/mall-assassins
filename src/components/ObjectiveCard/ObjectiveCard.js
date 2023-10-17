import React from 'react';
import { Button, Text, Heading, Box, Card, CardBody } from '@chakra-ui/react';

const ObjectiveCard = ({ isTask, fullWidth, bgColor, title, content, handleOnClick }) => {
  return (
    <Box
      width={fullWidth ? "100%" : "50%"}
      height="100%"
    >
      <Card width="100%" height="100%" textAlign="center">
        <Button bg={bgColor} onClick={handleOnClick} width="100%" height="100%" p={0}>
          <CardBody>
            <Heading as="h1" size="lg">
              {title}
            </Heading>
            {isTask ? <Text mt="3">Task</Text> : ""}
            <Text mt="2">{content}</Text>
          </CardBody>
        </Button>
      </Card>
    </Box>
  );
};

export default ObjectiveCard;