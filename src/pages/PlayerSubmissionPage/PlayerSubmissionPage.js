import React, { useState } from 'react';
import { Box, Center, Text, Input, Button } from '@chakra-ui/react';

const PlayerSubmissionPage = () => {
  const [image, setImage] = useState(null);
  console.log("Made it Here to PlayerSubmissionPage")

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    // You can handle the uploaded image here (e.g., upload to server, display preview, etc.)
    console.log('Uploaded Image:', file);
    setImage(URL.createObjectURL(file));
  };

  const handleSubmit = () => {
    // Handle form submission here
    console.log('Image Submitted:', image);
    // You can send the image to the server or perform other actions here
  };

  return (
    <Box p={4}>
      <Center mb={4}>
        <Box
          borderWidth={2}
          borderRadius="lg"
          p={8}
          width="80%"
          textAlign="center"
          cursor="pointer"
          onClick={() => document.getElementById('imageInput').click()}
        >
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
        </Box>
      </Center>
      <Button colorScheme="teal" onClick={handleSubmit}>
        Submit
      </Button>
    </Box>
  );
};

export default PlayerSubmissionPage;