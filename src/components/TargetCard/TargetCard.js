// Import necessary dependencies
import React from 'react';
import { Button, Text, Heading, Box, Card, CardBody } from '@chakra-ui/react';

// Define the basic card component
const TargetCard = ({ title, content, handleOnClick }) => {
  return (
    <Box
      width="50%"
      height="100%"
    >
        <Card bg="blue.100" width="100%" height="100%" textAlign="center">
          <Button onClick={handleOnClick} width="100%" height="100%" p={0}>
          <CardBody>
            <Heading as="h1" size="lg">
              {title}
            </Heading>
            <Text mt="2">{content}</Text>
          </CardBody>
          </Button>
        </Card>
    </Box>
  );
};

export default TargetCard;