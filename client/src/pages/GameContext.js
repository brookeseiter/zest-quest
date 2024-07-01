import { createContext, useState } from 'react';

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [restaurants, setRestaurants] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [clickedRestaurants, setClickedRestaurants] = useState([]);
  const [fourthRoundWinner, setFourthRoundWinner] = useState(null); // Add fourthRoundWinner state


  return (
    <GameContext.Provider value={{
      currentPlayer,
      setCurrentPlayer,
      currentCategoryIndex,
      setCurrentCategoryIndex,
      restaurants,
      setRestaurants,
      startIndex,
      setStartIndex,
      clickedRestaurants,
      setClickedRestaurants,
      fourthRoundWinner,
      setFourthRoundWinner
    }}>
      {children}
    </GameContext.Provider>
  );
};
