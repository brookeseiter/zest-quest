import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import RestaurantCard from "../components/RestaurantCard";
import { GameContext } from './GameContext';
import { 
    CardHeader, 
    CardFooter, 
    CardBody, 
    Typography, 
    Card, 
    Input,
    Select, 
    Option, 
    Radio,
    Button 
} from "@material-tailwind/react";


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
        setFourthRoundWinner,
        round,
        setRound
    } = useContext(GameContext);
    const location = useLocation();
    const navigate = useNavigate();
    const { gameSettings, finalRound } = location.state;

    const handleRestaurantClick = async (restaurant) => {
        try {
            await saveRoundResults(restaurant); 
    
            if (round === 5) {
                setRound(1);
            } else {
                setRound(round + 1);
            }
    
            if (clickedRestaurants.length === 3) {
                setFourthRoundWinner(restaurant);
            }
            setClickedRestaurants((prevClicked) => [...prevClicked, restaurant]);
            setStartIndex(startIndex + 2);
    
            navigate('/load', { state: { gameSettings: gameSettings } });
        } catch (error) {
            console.error('Error saving round results:', error);
        }
    };

    const saveRoundResults = async (restaurant) => {
        const roundResultsJSON = {
            'round': round,
            'currentPlayer': currentPlayer,
            'yelpBusinessId': restaurant.id,
            'gameSettingsId': gameSettings.game_settings_id
        };
    
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(roundResultsJSON)
        };
    
        const response = await fetch(`/round-results`, requestOptions);
        if (!response.ok) {
            throw new Error("Failed to save round results");
        }

        const roundResultsData = await response.json();
        console.log('Round results saved:', roundResultsData);
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
            <div className="base flex w-full h-screen justify-center items-center space-x-5">
                {/* <div className="flex justify-center w-3/4 h-3/4"> */}
                    {restaurantsToDisplay.map((restaurant, i) => (
                        <button 
                            className="w-1/3 h-1/3"
                            key={i} 
                            onClick={() => {handleRestaurantClick(restaurant)}}>
                            <RestaurantCard restaurant={restaurant} />
                        </button>
                    ))}
                {/* </div> */}
            </div>
        </>
    );
}

export default Game;