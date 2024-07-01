import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import RestaurantCard from "../components/RestaurantCard";
import { GameContext } from './GameContext';


function Game() {
    const {
        currentPlayer,
        setCurrentPlayer,
        restaurants,
        setRestaurants,
        currentCategoryIndex,
        startIndex,
        setStartIndex,
        clickedRestaurants,
        setClickedRestaurants,
        fourthRoundWinner,
        setFourthRoundWinner
    } = useContext(GameContext);
    const location = useLocation();
    const navigate = useNavigate();
    const { gameSettings, finalRound } = location.state;

    const handleRestaurantClick = (restaurant) => {
        if (clickedRestaurants.length === 3) {
            setFourthRoundWinner(restaurant);
        }
        setClickedRestaurants((prevClicked) => [...prevClicked, restaurant]);
        setStartIndex(startIndex + 2);
        navigate('/load', { state: { gameSettings: gameSettings } });
    };

    const isFourthRound = clickedRestaurants.length === 3 && fourthRoundWinner === null;
    const isFifthRound = clickedRestaurants.length === 4 && fourthRoundWinner !== null;

    let restaurantsToDisplay = [];
    if (isFifthRound) {
        const remainingRestaurant = clickedRestaurants[2];
        restaurantsToDisplay = [fourthRoundWinner, remainingRestaurant];
    } else if (isFourthRound) {
        restaurantsToDisplay = clickedRestaurants.slice(0, 2);
    } else {
        restaurantsToDisplay = restaurants.slice(startIndex, startIndex + 2);
    }
    
    // console.log('isFourthRound:', isFourthRound);
    // console.log('isFifthRound:', isFifthRound);
    // console.log('startIndex:', startIndex);
    // console.log('clickedRestaurants:', clickedRestaurants);

    return (
        <>
            <div>
                <p>Game Screen</p>
                {restaurantsToDisplay.map((restaurant, i) => (
                    <button key={i} onClick={() => handleRestaurantClick(restaurant)}>
                        <RestaurantCard restaurant={restaurant} />
                    </button>
                ))}
            </div>
        </>
    );
}

export default Game;