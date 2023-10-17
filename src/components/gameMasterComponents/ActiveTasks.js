import React, { useEffect, useState } from 'react';
import {
  Flex,
  Heading,
  Button,
  Text,
  Stack,
  Box,
  Center, 
  Image
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { retrieveAllTasks } from '../../firebase/database';

export const ActiveTasks = () => {
  const { roomID } = useParams();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {

    const retrieveTasks = () => {
      retrieveAllTasks(roomID, (tasks) => {
        setTasks(tasks);
      });
    }
    retrieveTasks();
  }, [roomID, tasks]);

  return(
    <Flex>
      <Stack spacing={4} width="100%">
        <Box>
          {tasks && tasks.map((title, index) => (
            <Text key={index}>{title}</Text>
          ))}
        </Box>
      </Stack>
    </Flex>
  )
}

    
    