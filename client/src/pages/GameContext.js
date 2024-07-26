import { createContext, useState } from 'react';

export const GameContext = createContext();

const initialState = {
  currentPlayer: 1,
  currentCategoryIndex: 0,
  restaurants: [],
  startIndex: 0,
  clickedRestaurants: [],
  fourthRoundWinner: null,
  round: 1,
};

export const GameProvider = ({ children }) => {
  const [currentPlayer, setCurrentPlayer] = useState(initialState.currentPlayer);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(initialState.currentCategoryIndex);
  const [restaurants, setRestaurants] = useState(initialState.restaurants);
  const [startIndex, setStartIndex] = useState(initialState.startIndex);
  const [clickedRestaurants, setClickedRestaurants] = useState(initialState.clickedRestaurants);
  const [fourthRoundWinner, setFourthRoundWinner] = useState(initialState.fourthRoundWinner);
  const [round, setRound] = useState(initialState.round);

  const resetGame = () => {
    setCurrentPlayer(initialState.currentPlayer);
    setCurrentCategoryIndex(initialState.currentCategoryIndex);
    setRestaurants(initialState.restaurants);
    setStartIndex(initialState.startIndex);
    setClickedRestaurants(initialState.clickedRestaurants);
    setFourthRoundWinner(initialState.fourthRoundWinner);
    setRound(initialState.round);
  };

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
      setFourthRoundWinner,
      round,
      setRound,
      resetGame 
    }}>
      {children}
    </GameContext.Provider>
  );
};
