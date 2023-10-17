import React from 'react';
import { Button, Text, Heading, Box, Card, CardBody } from '@chakra-ui/react';

const TargetCard = ({ title, content, submissionStatus, navigate, roomId, playerName, playerId }) => {
  const handleButtonClick = () => {
    // Append a route to the current URL and navigate to the new URL
    navigate(`/rooms/${roomId}/${playerName}/${playerId}/play/submit`);
  };

  return (
    <Box
      width="50%"
      height="100%"
    >
      <Button onClick={handleButtonClick} width="100%" height="100%" p={0}>
        <Card bg="blue.100" width="100%" height="100%" textAlign="center">
          <CardBody>
            <Heading as="h2" size="md">
              {title}
            </Heading>
            <Text mt="2">{content}</Text>
            <Text mt="2">{submissionStatus}</Text>
          </CardBody>
        </Card>
      </Button>
    </Box>
  );
};

export default TargetCard;