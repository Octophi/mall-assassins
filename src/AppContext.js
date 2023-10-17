import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isSubmissionPending, setSubmissionPending] = useState(false);

  const setPendingStatus = (status) => {
    setSubmissionPending(status);
  };

  return (
    <AppContext.Provider value={{ isSubmissionPending, setPendingStatus }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
