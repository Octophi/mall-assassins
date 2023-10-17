import { getDatabase, ref, set, get, push, child, update, remove, onValue } from 'firebase/database';
import app from './firebaseConfig';

// Get a reference to the Firebase Realtime Database
const database = getDatabase(app);

// Function to push a new game (room) to the active games list
export const createGame = (roomKey, gameData) => {
  gameData.active = true;
  const gameRef = ref(database, `activeGames/${roomKey}`);
  return set(gameRef, gameData);
};

// Function to retrieve a specific game (room) by room key
export const getGameByRoomKey = (roomKey) => {
  const gameRef = ref(database, `activeGames/${roomKey}`);
  return get(gameRef);
};

// Function to update game data in a specific room
export const updateGame = (roomKey, updates) => {
  const gameRef = ref(database, `activeGames/${roomKey}`);
  return update(gameRef, updates);
};

// Function to delete a game (room)
export const deleteGame = (roomKey) => {
  const gameRef = ref(database, `activeGames/${roomKey}`);
  return remove(gameRef);
};

export const doesGameExist = async (roomKey) => {
  try {
    const roomRef = ref(database, `activeGames/${roomKey}`);
    const snapshot = await get(roomRef);
    console.log(snapshot.exists());
    return snapshot.exists();
  } catch (error) {
    console.error('Error checking room:', error);
    throw error;
  }
}

export const addPlayer = async (roomKey, playerName, playerID) => {
  try {
    const gameRef = ref(database, `activeGames/${roomKey}`);
    const gameSnapshot = await get(gameRef);
    if(gameSnapshot.exists()) {
      const gameData = gameSnapshot.val();
      if(gameData.playerNames && gameData.playerNames.includes(playerName)) {
        throw new Error("Player name already exists in the game. Please change your name.");
      }

      if(!gameData.playerIDs) {
        gameData.playerIDs = [playerID];
      } else {
        gameData.playerIDs.push(playerID);
      }

      if(!gameData.playerNames) {
        gameData.playerNames = [playerName];
      } else {
        gameData.playerNames.push(playerName);
      }

      await update(gameRef, gameData);
    } else {
      console.error('Error adding Player ID, no snapshot');
    }
  } catch (error) {
    console.error('Error adding Player ID:', error);
    throw error;
  }
}

export const countNumberOfPlayers = (roomKey, callback) => {
  const gameRef = ref(database, `/activeGames/${roomKey}/playerIDs`);
  onValue(gameRef, (snapshot) => {
    const playerIDs = snapshot.val();
    const count = playerIDs ? Object.keys(playerIDs).length : 0;
    callback(count);
  });
};

export const retrieveGameStatus = (roomKey, callback) => {
  const gameRef = ref(database, `/activeGames/${roomKey}/roomStatus`);
  onValue(gameRef, (snapshot) => {
    const gameStatus = snapshot.val();
    callback(gameStatus);
  });
};

export const updateGameStatus = async (roomKey, status) => {
  try {
    const gameRef = ref(database, `/activeGames/${roomKey}`);
    const gameSnapshot = await get(gameRef);
    if(gameSnapshot.exists()) {
      const gameData = gameSnapshot.val();
      gameData.roomStatus = status;
      
      await update(gameRef, gameData);
    } else {
      console.error('Game Snapshot do not exist');
    }
  } catch (error) {
    console.error('Error Fetching Game Snapshot: ', error);
    throw error;
  }
}

export const createPlayer = (playerKey, playerData) => {
  const playerRef = ref(database, `players/${playerKey}`);
  return set(playerRef, playerData);
}

export const createTask = (taskKey, taskData) => {
  const taskRef = ref(database, `tasks/${taskKey}`);
  return set(taskRef, taskData);
}