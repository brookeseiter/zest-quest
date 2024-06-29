import { createContext, useState } from 'react';

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [restaurants, setRestaurants] = useState([]);

  return (
    <GameContext.Provider value={{
      currentPlayer,
      setCurrentPlayer,
      currentCategoryIndex,
      setCurrentCategoryIndex,
      restaurants,
      setRestaurants,
    }}>
      {children}
    </GameContext.Provider>
  );
};
