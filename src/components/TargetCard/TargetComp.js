// Import necessary dependencies
import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router
import { Text, Heading, Box, Card, CardBody } from '@chakra-ui/react';

// Define the basic card component
const TargetComp = ({ title, content, submissionStatus }) => {
  return (
    <Box 
    width="100%"
    height="100%"
    display="flex"
    justifyContent="center"
    alignItems="center"> 
    
      <Link to="/rooms/:roomId/:playerName/:playerID/play/submit">

        <Card borderWidth="1px" p="100">
          <CardBody>
            <Heading as="h2" size="md">
              {title}
            </Heading>
            <Text mt="2">{content}</Text>
            <Text mt="2">{submissionStatus}</Text>
          </CardBody>
        </Card>
      </Link>
    </Box>
  );
};

export default TargetComp;