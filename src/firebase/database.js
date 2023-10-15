import { getDatabase, ref, set, get, push, child, update, remove } from 'firebase/database';
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
