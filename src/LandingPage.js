import { Button, Flex, Heading } from '@chakra-ui/react';

const LandingPage = () => {
  return (
    <Flex direction="column" align="center" justify="center" h="100vh">
      <Heading as="h1" size="xl" mb={4}>
        Welcome to Mall Assassins!
      </Heading>
      <Button colorScheme="blue" size="lg" mb={4}>
        Join a Room
      </Button>
      <Button colorScheme="green" size="lg">
        Host a Room
      </Button>
    </Flex>
  );
};

export default LandingPage;
