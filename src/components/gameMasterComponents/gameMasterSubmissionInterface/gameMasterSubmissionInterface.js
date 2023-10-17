import React, { useState, useEffect } from 'react';
import { Box, Button, Image, Text } from '@chakra-ui/react';
import { approveSubmission, denySubmission, getOldestSubmission } from '../../../firebase/gameMasterSubmission';

const SubmissionComponent = () => {
  const [oldestSubmission, setOldestSubmission] = useState(null);

  useEffect(() => {
    // Fetch the oldest submission when the component mounts.
    fetchOldestSubmission();
  }, []);

  const fetchOldestSubmission = async () => {
    try {
      const submission = await getOldestSubmission();
      setOldestSubmission(submission);
    } catch (error) {
      console.error('Error fetching oldest submission:', error);
    }
  };

  const handleApprove = (submissionId) => {
    // Call the backend function to approve the submission
    approveSubmission(submissionId)
      .then(() => {
        // Handle success (e.g., display a success message)
      })
      .catch((error) => {
        // Handle error (e.g., display an error message)
        console.error('Error approving submission:', error);
      });
  };

  const handleDeny = (submissionId) => {
    // Call the backend function to deny the submission
    denySubmission(submissionId)
      .then(() => {
        // Handle success (e.g., display a success message)
      })
      .catch((error) => {
        // Handle error (e.g., display an error message)
        console.error('Error denying submission:', error);
      });
  };

  return (
    <div>
      {oldestSubmission ? (
        <Box
          borderWidth="1px"
          borderRadius="lg"
          p={4}
          maxW="sm"
          margin="auto"
          boxShadow="md"
        >
          <Text fontSize="xl" fontWeight="bold">
            {oldestSubmission.title}
          </Text>
          <Image src={oldestSubmission.imageUrl} alt={oldestSubmission.title} mt={4} />
          <Box mt={4} textAlign="center">
            <Button
              colorScheme="green"
              size="sm"
              mr={2}
              onClick={() => handleApprove(oldestSubmission.id)}
            >
              Approve
            </Button>
            <Button
              colorScheme="red"
              size="sm"
              onClick={() => handleDeny(oldestSubmission.id)}
            >
              Deny
            </Button>
          </Box>
        </Box>
      ) : (
        <Text>Loading oldest submission...</Text>
      )}
    </div>
  );
};

export default SubmissionComponent;
