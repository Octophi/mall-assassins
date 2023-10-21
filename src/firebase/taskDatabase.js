import { getDatabase, ref, set, get, update, onValue } from 'firebase/database';
import app from './firebaseConfig';

// Get a reference to the Firebase Realtime Database
const database = getDatabase(app);

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