import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { createTask } from '../../firebase/database.js'; 
import { useHistory } from 'react-router-dom';

import {
    Flex,
Heading,
    Button,
    Box,
    Input,
    Stack,
    Text
  } from '@chakra-ui/react';
  import { Link, useParams } from 'react-router-dom';

function CreateTask() {
  const [formData, setFormData] = useState({
    id: uuidv4(),    
    title: '',
    description: '',
    audience: '',
    points: '',
    status: 'incomplete',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Here");
    
    try {
      await createTask(formData.id, formData);

      console.log('Data has been successfully pushed to the Realtime Database.');
  
      // Reset the form data to its initial values
      setFormData({
        id: uuidv4(),
        title: '',
        description: '',
        audience: '',
        points: '',
        status: 'incomplete',
      });
    } catch(error) {
      console.error('Error pushing data to the Realtime Database:', error);
    }
  };
  

  return (
    <div>
      <h1>My React Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="id">ID:</label>
          <input
            type="text"
            id="id"
            name="id"
            value={formData.id}
            readOnly // Mark the 'id' input as read-only since it's generated
          />
        </div>

        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="audience">Audience:</label>
          <input
            type="text"
            id="audience"
            name="audience"
            value={formData.audience}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="points">Points:</label>
          <input
            type="text"
            id="points"
            name="points"
            value={formData.points}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="status">Status:</label>
          <input
            type="text"
            id="status"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            style={{
                borderColor: "red", // Set border color to red
                color: "red", // Set text color to red
              }}
          />
        </div>

        <Button
          type="submit"
          colorScheme="blue" // Set the button color scheme
          size="md" // Set the button size (sm, md, lg)
          borderRadius="md" // Set the border radius
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

export default CreateTask;