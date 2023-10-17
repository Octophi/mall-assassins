import React, { useState } from 'react';
import { Box, Center, Text, Input, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../AppContext';


const PlayerSubmissionPage = () => {
  const [image, setImage] = useState(null);
  const [imageUploaded, setImageUploaded] = useState(false);
  const navigate = useNavigate();
  const { isSubmissionPending, setPendingStatus } = useAppContext();
  console.log(isSubmissionPending)

  const handleBackNavigation = () => {
    setPendingStatus(false)
    navigate(-1);
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    // You can handle the uploaded image here (e.g., upload to server, display preview, etc.)
    console.log('Uploaded Image:', file);
    setImage(URL.createObjectURL(file));
    setImageUploaded(true); // update this state so we disable the button
  };

  const handleSubmit = () => {
    // Handle form submission here
    console.log('Image Submitted:', image);
    // You can send the image to the server or perform other actions here
    setPendingStatus(true);
    navigate(-1);
  };

  return (
    <Box p={4} height="100vh">
      <Button onClick={handleBackNavigation}
        position="absolute"
        top="2"
        left="2"
        variant="ghost" // Use "ghost" variant for transparent background
        color="black" // Set text color to black
      >
        Back
      </Button>
      <Center mb={4} height="80%">
        <Box
          borderWidth={2}
          borderRadius="lg"
          borderStyle="dotted"
          p={8}
          width="80%"
          height="80%"
          textAlign="center"
          cursor="pointer"
          onClick={() => document.getElementById('imageInput').click()}
        >
          <Center mb={4}>
            {image ? (
              <img src={image} alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '200px' }} />
            ) : (
              <Text>Click or Drag to Upload Image</Text>
            )}
            <Input
              id="imageInput"
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleImageUpload}

            />
          </Center>
        </Box>
      </Center>
      <Center mb={4}>
        <Button colorScheme="blue" onClick={handleSubmit} width="80%" isDisabled={!imageUploaded}>
          Submit
        </Button>
      </Center>
    </Box>
  );
};

export default PlayerSubmissionPage;