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
import { retrieveAllTasks } from '../../firebase/taskDatabase';
import TaskCard from './TaskCard';

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
          {tasks && tasks.map((title, index) => (
            <TaskCard title={title} index={index} />
          ))}
      </Stack>
    </Flex>
  )
}

    
    