import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { createTask, addTask } from '../../firebase/database.js'; 
import { useHistory } from 'react-router-dom';

import {
    Flex,
    Heading,
    Button,
    Box,
    Input,
    Stack,
    Text, Select
  } from '@chakra-ui/react';
  import { Link, useParams } from 'react-router-dom';

function CreateTask() {
  const { roomID } = useParams();
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

    try {
      await createTask(formData.id, formData);
      await addTask(roomID, formData.title, formData.points);

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
    } catch (error) {
      console.error('Error pushing data to the Realtime Database:', error);
    }
  };

  // Define options for the dropdown select
  const audienceOptions = ['Dead', 'Alive'];

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title" >Task Title:</label>
          <Input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            borderColor="blue.300" 
          />
        </div>

        <div>
          <label htmlFor="description">Description:</label>
          <Input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            borderColor="blue.300" // Add a border color
          />
        </div>

        <div>
          <label htmlFor="audience">Audience:</label>
          <Select
            id="audience"
            name="audience"
            value={formData.audience}
            onChange={handleInputChange}
          >
            {audienceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <label htmlFor="points">Points:</label>
          <Input
            type="number"
            id="points"
            name="points"
            min="1"
            max="1000"
            value={formData.points}
            onChange={handleInputChange}
            borderColor="blue.300" // Add a border color
          />
        </div>

        <Button
          type="submit"
          colorScheme="blue"
          size="md"
          borderRadius="md"
          mt={5}
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

export default CreateTask;
