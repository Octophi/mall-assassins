import { getDatabase, ref, set, get, push, child, update, remove, onValue, updateDoc, query, orderByChild, equalTo } from 'firebase/database';
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
      console.error('Game Snapshot does not exist');
    }
  } catch (error) {
    console.error('Error Fetching Game Snapshot: ', error);
    throw error;
  }
}

export const retrieveAllPlayers = (roomKey, callback) => {
  const gameRef = ref(database, `/activeGames/${roomKey}/playerNames`);
  onValue(gameRef, (snapshot) => {
    const gameStatus = snapshot.val();
    callback(gameStatus);
  });
};

export const createPlayer = (playerKey, playerData) => {
  const playerRef = ref(database, `players/${playerKey}`);
  return set(playerRef, playerData);
}



export const createTask = (taskKey, taskData) => {
  const taskRef = ref(database, `tasks/${taskKey}`);
  return set(taskRef, taskData);
}

export const addTask = async (roomKey, title, points) => {
  try {
    const gameRef = ref(database, `activeGames/${roomKey}`);
    const gameSnapshot = await get(gameRef);
    if(gameSnapshot.exists()) {
      const gameData = gameSnapshot.val();

      if(!gameData.taskTitles) {
        gameData.taskTitles = [title];
      } else {
        gameData.taskTitles.push(title);
      }

      if(!gameData.taskPoints) {
        gameData.taskPoints = [points];
      } else {
        gameData.taskPoints.push(points);
      }

      await update(gameRef, gameData);
    } else {
      console.error('Error adding task, no snapshot');
    }
  } catch (error) {
    console.error('Error adding task:', error);
    throw error;
  }
}

export const retrieveAllTasks = (roomKey, callback) => {
  const gameRef = ref(database, `/activeGames/${roomKey}/taskTitles`);
  onValue(gameRef, (snapshot) => {
    const gameStatus = snapshot.val();
    callback(gameStatus);
  });
};

export const leaveRoom = async (roomKey, playerID) => {
  try {
    const playerRef = ref(database, `players/${playerID}`);
    const playerSnapshot = await get(playerRef);
    const gameRef = ref(database, `activeGames/${roomKey}`);
    const gameSnapshot = await get(gameRef);
    
    if (playerSnapshot.exists() && gameSnapshot.exists()) {
      const playerData = playerSnapshot.val();
      const playerName = playerData.playerName;
      const gameData = gameSnapshot.val();
      const updatedPlayerIDs = gameData.playerIDs.filter((id) => id !== playerID);
      const updatedPlayerNames = gameData.playerNames.filter((name) => name !== playerName);
      gameData.playerIDs = updatedPlayerIDs;
      gameData.playerNames = updatedPlayerNames;
      await update(gameRef, gameData);
      await remove(playerRef, playerData);
    } else {
      console.error("Player doesn't exist.");
    }
  } catch (error) {
    console.error('Error removing Player: ', error);
    throw error;
  }
}


// Takes in a boolean argument
export const getPlayersByAliveStatus = async (isAlive) => {
  // Create a reference to the "players" node
  const playersRef = ref(database, "players");

  // Create a query to filter players where "isAlive" is true
  const alivePlayersQuery = query(playersRef, orderByChild("isAlive"), equalTo(isAlive));

  try {
    const snapshot = await get(alivePlayersQuery);

    if (snapshot.exists()) {
      const alivePlayers = [];
      snapshot.forEach((childSnapshot) => {
        const playerId = childSnapshot.key;
        const playerData = childSnapshot.val();
        alivePlayers.push({ id: playerId, ...playerData });
      });

      console.log("Alive players: ", alivePlayers);

      return alivePlayers; // Return the list of alive players
    } else {
      console.log(`No ${(isAlive) ? "alive" : "dead" } players found.`);
      return null; // No players found
    }
  } catch (error) {
    throw error;
  }
}
