import { useEffect, useState } from 'react';
import {
  Flex,
  Heading,
  Text
} from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import { countNumberOfPlayers, retrieveGameStatus } from '../../firebase/database';


const PlayerWaitingPage = () => {
  const { roomID } = useParams(); // Use useParams to access route parameters
  const { playerName } = useParams();
  const { playerID } = useParams();
  const [playerCount, setPlayerCount] = useState(0);
  const [gameStatus, setGameStatus] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the player count from API
    const fetchPlayerCount = async () => {
      try {
        const count = await countNumberOfPlayers(roomID);
        setPlayerCount(count);
      } catch (error) {
        // Handle any errors
        console.error('Error fetching player count:', error);
      }
    };

    fetchPlayerCount();
  }, [roomID]);

  useEffect(() => {
    // Check if game is started
    const fetchGameStatus = async () => {
      try {
        const gameStatus = await retrieveGameStatus(roomID);
        setGameStatus(gameStatus);

        if (gameStatus === 'Active') {
          navigate(`/rooms/${roomID}/${playerName}/${playerID}/play`);
        } 
      } catch (error) {
        // Handle any erros
        console.error('Error fetching game status: ', error);
      }
    };

    fetchGameStatus();
  }, [roomID]);
  
  return (
    <div>
      <Flex direction="column" align="center" justify="center" h="100vh">
        <Heading as="h1" size="xl" mb={4}>
          Room ID: {roomID}
        </Heading>
        <Heading as="h2" size="xl" mb={4}>
          Role: Player
        </Heading>
        <Heading as="h2" size="xl" mb={4}>
          Player Name: { playerName }
        </Heading>
        <Text>
          Number of Players in the Lobby: {playerCount}
        </Text>
      </Flex>
    </div>
  );
};

export default PlayerWaitingPage;
