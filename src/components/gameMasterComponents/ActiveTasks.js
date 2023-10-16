import React, { useEffect, useState } from 'react';
import app from '../../firebase/firebaseConfig';

//const db = getDatabase(app);

export const ActiveTasks = () => {
  // const [data, setData] = useState({});

  // useEffect(() => {
  //   // Create a reference to the data you want to listen to
  //   const dataRef = db.ref('activeTasks/${taskID}'); // Replace with your data path

  //   // Attach a listener to get real-time updates
  //   const onDataChange = (snapshot) => {
  //     const updatedData = snapshot.val();
  //     setData(updatedData);
  //   };

  //   dataRef.on('value', onDataChange);

  //   // Clean up the listener when the component unmounts
  //   return () => {
  //     dataRef.off('value', onDataChange);
  //   };
  // }, []);

  // return (
  //   <div>
  //     <h1>Real-time Data:</h1>
  //     <pre>{JSON.stringify(data, null, 2)}</pre>
  //   </div>
  // );
}

    
    