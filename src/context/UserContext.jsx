'use client';

import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [imageIds, setImageIds] = useState([]);
  const [noBgImageIds, setNoBgImageIds] = useState([]);
  const [hasProductIndexes, setHasProductIndexes] = useState(false);

  return (
    <UserContext.Provider value={{
      userId,
      imageIds,
      noBgImageIds,
      hasProductIndexes,
      setUserId,
      setImageIds,
      setNoBgImageIds,
      setHasProductIndexes,
    }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUserData = () => useContext(UserContext);