import { getDatabase, ref, query, orderByChild, equalTo, limitToFirst, get } from 'firebase/database';
import app from './firebaseConfig';

const database = getDatabase(app);

// Function to get the oldest pending submission
export const getOldestSubmission = async () => {
    // Display submissions in this priority: kills, revives, task submissions
    const submissionsRef = ref(database, 'submissions');
    
    try {
      const submissionsQuery = query(submissionsRef, 
        orderByChild('Timestamp'), 
        equalTo('Pending', 'Status'), 
        limitToFirst(1)
      );
  
      const snapshot = await get(submissionsQuery);
      
      if (snapshot.exists()) {
        const submission = snapshot.val();
        return submission;
    } else {
        // No pending submissions found
        console.log('No pending submissions found:');
      }
    } catch (error) {
      console.error('Error getting the oldest submission:', error);
    }
  };
  
  // Function to reassign targets when a player is killed
  export const reassignPlayers = async (targetMappingId, newTargetId) => {
    try {
      // Retrieve the target mapping that needs to be updated
      const targetMappingRef = ref(database, `targetMappings/${targetMappingId}`);
      const snapshot = await get(targetMappingRef);
  
      if (snapshot.exists()) {
        const targetMapping = snapshot.val();
  
        // If the target mapping exists and the old target is not the same as the new target
        if (targetMapping.AssassinID !== newTargetId) {
          // Implement an algorithm to redistribute targets equally among remaining players
          // Calculate the number of players in the game, excluding the dead ones
          const totalPlayers = targetMapping.Players.filter(player => player.Status === 'Alive').length;
          
          // Create an array of available target IDs (excluding the new target)
          const availableTargets = targetMapping.Players.filter(player => player.Status === 'Alive' && player.PlayerID !== newTargetId).map(player => player.PlayerID);
          
          // Shuffle the available targets to distribute them randomly
          for (let i = availableTargets.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [availableTargets[i], availableTargets[j]] = [availableTargets[j], availableTargets[i]];
          }
          
          // Distribute targets to the remaining players
          targetMapping.Players.forEach((player) => {
            if (player.Status === 'Alive' && player.PlayerID !== newTargetId) {
              player.TargetID = availableTargets.pop();
            }
          });
  
          // Update the target mapping with the redistributed targets
          update(targetMappingRef, targetMapping);
        }
      }
    } catch (error) {
      console.error('Error reassigning players:', error);
    }
  };
  
export const approveSubmission = async (submissionId) => {
    try {
        const submissionRef = ref(database, `submissions/${submissionId}`);
        const submissionSnapshot = await get(submissionRef);

        if (submissionSnapshot.exists()) {
        const submission = submissionSnapshot.val();
        const { TaskID, TargetMappingID, TargetID, Points } = submission;

        // You need to implement logic to update Task/TargetMapping Status based on the submission type.
        if (TaskID) {
            // It's a task submission

            // Clear other submissions for the same task
            await clearOtherTaskSubmissions(submission.TaskID, submission.PlayerID);
            
            const taskPoints = getPointsForTask(TaskID); // Get points for the task
            addPointsToUser(submission.PlayerID, taskPoints);

            // Update task status
            updateTaskStatus(TaskID, 'Complete');
        } else if (TargetMappingID) {
            // It's a kill submission

            // Change the target player's status to 'Dead'
            await updatePlayerStatus(submission.TargetID, 'Dead');
            // Clear submissions for the target player ID
            await clearSubmissionsForPlayer(submission.TargetID);
            // Clear other submissions trying to kill the target player ID
            await clearOtherTargetSubmissions(submission.TargetMappingID, submission.TargetID);
            // Reassign the target player's targets
            await reassignPlayers(submission.TargetMappingID, submission.TargetID);

            const killPoints = getPointsForKill(TargetMappingID); // Get points for the kill submission
            addPointsToUser(submission.PlayerID, killPoints);

            // Update TargetMapping Status
            updateTargetMappingStatus(TargetMappingID, 'Complete'); 
        }   

        // Update the submission status to 'Complete'
        await update(submissionRef, { Status: 'Complete' });
        }
    } catch (error) {
        console.error('Error approving submission:', error);
    }
};
  
  // Function to update the status of a task
export const updateTaskStatus = async (taskID, newStatus) => {
    try {
      const taskRef = ref(database, `tasks/${taskID}`);
      const taskSnapshot = await get(taskRef);
  
      if (taskSnapshot.exists()) {
        const taskData = taskSnapshot.val();
        
        // Update the task's status to the newStatus
        await update(taskRef, { Status: newStatus });
      } else {
        console.error('Task not found:', taskID);
      }
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };
  
// Function to get points for a task
export const getPointsForTask = async (taskID) => {
    try {
      const taskRef = ref(database, `tasks/${taskID}`);
      const taskSnapshot = await get(taskRef);
  
      if (taskSnapshot.exists()) {
        const taskData = taskSnapshot.val();
        // Assuming that tasks have a "Points" field to specify the points for the task
        const taskPoints = taskData.Points;
  
        return taskPoints;
      } else {
        console.error('Task not found:', taskID);
        return 0; // Return 0 points if the task is not found
      }
    } catch (error) {
      console.error('Error getting points for task:', error);
      return 0; // Return 0 points in case of an error
    }
};

// Function to get points for a kill submission
export const getPointsForKill = async (targetMappingID) => {
    try {
      const targetMappingRef = ref(database, `targetMappings/${targetMappingID}`);
      const targetMappingSnapshot = await get(targetMappingRef);
  
      if (targetMappingSnapshot.exists()) {
        const targetMappingData = targetMappingSnapshot.val();
        // Assuming that target mappings have a "Points" field to specify the points for the kill
        const killPoints = targetMappingData.Points;
  
        return killPoints;
      } else {
        console.error('Target mapping not found:', targetMappingID);
        return 0; // Return 0 points if the target mapping is not found
      }
    } catch (error) {
      console.error('Error getting points for kill submission:', error);
      return 0; // Return 0 points in case of an error
    }
};
  

// Function to update the status of a target mapping
export const updateTargetMappingStatus = async (targetMappingID, newStatus) => {
    try {
        const targetMappingRef = ref(database, `targetMappings/${targetMappingID}`);
        const targetMappingSnapshot = await get(targetMappingRef);

        if (targetMappingSnapshot.exists()) {
        const targetMappingData = targetMappingSnapshot.val();
        
        // Update the target mapping's status to the newStatus
        await update(targetMappingRef, { Status: newStatus });
        } else {
        console.error('Target mapping not found:', targetMappingID);
        }
    } catch (error) {
        console.error('Error updating target mapping status:', error);
    }
};
  

// Function to update player status
const updatePlayerStatus = async (playerId, status) => {
    try {
        const playerRef = ref(database, `players/${playerId}`);
        await update(playerRef, { Status: status });
    } catch (error) {
        console.error('Error updating player status:', error);
    }
};
  
// Function to clear submissions for a specific player
const clearSubmissionsForPlayer = async (playerId) => {
    try {
        const submissionsRef = ref(database, 'submissions');
        const submissionsQuery = query(submissionsRef, equalTo('PlayerID', playerId));
        const submissionsSnapshot = await get(submissionsQuery);

        if (submissionsSnapshot.exists()) {
        const submissions = submissionsSnapshot.val();

        for (const submissionId in submissions) {
            // Clear submissions for the specific player
            await update(ref(submissionsRef, submissionId), { Status: 'Complete' });
        }
        }
    } catch (error) {
        console.error('Error clearing submissions for player:', error);
    }
};
  
// Function to clear other submissions for the same task
const clearOtherTaskSubmissions = async (taskID, playerID) => {
    try {
        const taskSubmissionsRef = ref(database, 'submissions');
        const taskSubmissionsQuery = query(taskSubmissionsRef, equalTo('TaskID', taskID));
        const taskSubmissionsSnapshot = await get(taskSubmissionsQuery);

        if (taskSubmissionsSnapshot.exists()) {
        const taskSubmissions = taskSubmissionsSnapshot.val();

        for (const submissionId in taskSubmissions) {
            if (taskSubmissions[submissionId].PlayerID !== playerID) {
            // Clear other submissions for the same task
            await update(ref(taskSubmissionsRef, submissionId), { Status: 'Complete' });
            }
        }
        }
    } catch (error) {
        console.error('Error clearing other task submissions:', error);
    }
};
  
// Function to clear other submissions for the target player and change target player's status to 'Dead'
const clearOtherTargetSubmissions = async (targetMappingID, targetPlayerID) => {
    try {
        const targetSubmissionsRef = ref(database, 'submissions');
        const targetSubmissionsQuery = query(targetSubmissionsRef, equalTo('TargetMappingID', targetMappingID));
        const targetSubmissionsSnapshot = await get(targetSubmissionsQuery);

        if (targetSubmissionsSnapshot.exists()) {
        const targetSubmissions = targetSubmissionsSnapshot.val();

        for (const submissionId in targetSubmissions) {
            if (targetSubmissions[submissionId].TargetID !== targetPlayerID) {
            // Clear other submissions for the target player
            await update(ref(targetSubmissionsRef, submissionId), { Status: 'Complete' });
            }
        }
        }
    } catch (error) {
        console.error('Error clearing other target submissions:', error);
    }
};

export const addPointsToUser = async (playerID, pointsToAdd) => {
    try {
        const playerRef = ref(database, `players/${playerID}`);
        const playerSnapshot = await get(playerRef);

        if (playerSnapshot.exists()) {
        const playerData = playerSnapshot.val();
        const currentPoints = playerData.Points || 0;
        const updatedPoints = currentPoints + pointsToAdd;

        // Update the player's points
        await update(playerRef, { Points: updatedPoints });
        }
    } catch (error) {
        console.error('Error adding points to user:', error);
    }
};
  
  
// Function to deny a submission
export const denySubmission = async (submissionId) => {
    try {
        const submissionRef = ref(database, `submissions/${submissionId}`);
        const submissionSnapshot = await get(submissionRef);

        if (submissionSnapshot.exists()) {
        const submission = submissionSnapshot.val();

        // Handle the submission based on its type (Task or TargetMapping)
        if (submission.TaskID) {
            // This is a task submission
            // Return the submission to the queue for further processing
            await returnTaskSubmissionToQueue(submission.TaskID, submission);
        } else if (submission.TargetMappingID) {
            // This is a target mapping submission
            // Return the submission to the queue for further processing
            await returnTargetMappingSubmissionToQueue(submission.TargetMappingID, submission);
        }

        // Optionally, you can mark the submission as denied in the database
        await update(submissionRef, { Status: 'Denied' });
        }
    } catch (error) {
        console.error('Error denying submission:', error);
    }
};
  
// Function to return a task submission to the queue for further processing
const returnTaskSubmissionToQueue = async (taskID, submission) => {
    try {
        const taskQueueRef = ref(database, `taskQueue/${taskID}`);
        // Push the submission back to the task queue
        const newSubmissionRef = push(taskQueueRef);
        // Set the submission data in the new queue entry
        await update(newSubmissionRef, submission);
    } catch (error) {
        console.error('Error returning task submission to the queue:', error);
    }
};
  
// Function to return a target mapping submission to the queue for further processing
const returnTargetMappingSubmissionToQueue = async (targetMappingID, submission) => {
    try {
        const targetMappingQueueRef = ref(database, `targetMappingQueue/${targetMappingID}`);
        // Push the submission back to the target mapping queue
        const newSubmissionRef = push(targetMappingQueueRef);
        // Set the submission data in the new queue entry
        await update(newSubmissionRef, submission);
    } catch (error) {
        console.error('Error returning target mapping submission to the queue:', error);
    }
};
