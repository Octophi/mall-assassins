import { useEffect, useState } from 'react';
import {
  Flex,
  Heading,
  Text, 
  Image
} from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import { countNumberOfPlayers, retrieveGameStatus } from '../../firebase/database';

const PlayerWaitingPage = () => {
  const { roomID } = useParams();
  const { playerName } = useParams();
  const { playerID } = useParams();
  const [playerCount, setPlayerCount] = useState(0);
  const [gameStatus, setGameStatus] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlayerCount = () => {
      countNumberOfPlayers(roomID, (count) => {
        setPlayerCount(count);
      });
    };

    // Immediately fetch the player count when the component loads
    fetchPlayerCount();

    // Set up a real-time listener for game status
    retrieveGameStatus(roomID, (status) => {
      setGameStatus(status);

      if (status === 'Active') {
        navigate(`/rooms/${roomID}/${playerName}/${playerID}/play`);
      }
    });
  }, [roomID, playerName, playerID, navigate]);

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
