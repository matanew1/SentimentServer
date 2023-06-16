import React, { createContext, useState, useEffect, useMemo, useCallback } from 'react';

// Create the UserContext
const UserContext = createContext();

// Create a UserProvider component
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : {};
  });
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
    return storedIsLoggedIn ? JSON.parse(storedIsLoggedIn) : false;
  });

  // Function to update the user data
  const updateUser = useCallback((userData) => {
    setUser(userData);
    if (userData) {
      setIsLoggedIn(true);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('isLoggedIn', true);
    } else {
      setIsLoggedIn(false);
      localStorage.removeItem('user');
      localStorage.setItem('isLoggedIn', false);
    }
  }, []);

  useEffect(() => {
    console.log(user);
    console.log(isLoggedIn)
  }, [isLoggedIn, user]);

  const contextValue = useMemo(() => ({ user, updateUser, isLoggedIn }), [
    user,
    updateUser,
    isLoggedIn,
  ]);

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };