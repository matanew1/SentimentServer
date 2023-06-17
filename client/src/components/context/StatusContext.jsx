import React, { createContext, useState, useMemo, useCallback } from 'react';

// Create the UserContext
const StatusContext = createContext();

// Create a StatusProvider component
const StatusProvider = ({ children }) => {
  const [isRecents, setIsRecent] = useState(true);
  
  // Function to update isRecents variable
  const updateStatus = useCallback((data) => {
    setIsRecent(data);
  }, []); 

  const contextValue = useMemo(() => ({
     isRecents, updateStatus 
    }),[isRecents, updateStatus]);

  return (
    <StatusContext.Provider value={contextValue}>
      {children}
    </StatusContext.Provider>
  );
};

export { StatusContext, StatusProvider };