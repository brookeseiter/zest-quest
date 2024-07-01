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
    // const [fourthRoundWinner, setFourthRoundWinner] = useState(null);

    useEffect(() => {
        if (startIndex === restaurants.length) {
            setStartIndex(0);
        }
    }, [startIndex, restaurants.length]);

    // the following work through round 4 not 5 (repeat of round 2)
    // const handleRestaurantClick = (restaurant) => {
    //     setClickedRestaurants((prevClicked) => [...prevClicked, restaurant]);
    //     if (finalRound) {
    //         navigate('/results', { state: { gameSettings: gameSettings } });
    //     } else {
    //         setStartIndex(startIndex + 2);
    //         navigate('/load', { state: { gameSettings: gameSettings } });
    //     }
    // };
    // const isFourthRound = clickedRestaurants.length === 3;
    // const restaurantsToDisplay = isFourthRound
    //     ? clickedRestaurants.slice(0, 2) 
    //     : restaurants.slice(startIndex, startIndex + 2);

    // promising for the addition of isFifthRound
    // const handleRestaurantClick = (restaurant) => {
    //     if (clickedRestaurants.length === 2) {
    //         setFourthRoundWinner(restaurant);
    //     } else {
    //         setClickedRestaurants((prevClicked) => [...prevClicked, restaurant]);
    //     }
        
    //     if (finalRound) {
    //         navigate('/results', { state: { gameSettings: gameSettings } });
    //     } else {
    //         setStartIndex(startIndex + 2);
    //         navigate('/load', { state: { gameSettings: gameSettings } });
    //     }
    // };
    // const isFourthRound = clickedRestaurants.length === 3;
    // const isFifthRound = clickedRestaurants.length === 4;
    // const restaurantsToDisplay = isFifthRound
    //     ? [fourthRoundWinner, clickedRestaurants[2]]
    //     : isFourthRound
    //     ? clickedRestaurants.slice(0, 2)
    //     : restaurants.slice(startIndex, startIndex + 2);


    // the following works
    const handleRestaurantClick = (restaurant) => {
        if (clickedRestaurants.length === 3) {
            setFourthRoundWinner(restaurant);
            setClickedRestaurants((prevClicked) => [...prevClicked, restaurant]);
        } else {
            setClickedRestaurants((prevClicked) => [...prevClicked, restaurant]);
        }

        if (finalRound) {
            navigate('/results', { state: { gameSettings: gameSettings } });
        } else {
            setStartIndex(startIndex + 2);
            navigate('/load', { state: { gameSettings: gameSettings } });
        }
    };

    // Determine if it's the fourth or fifth round based on clickedRestaurants state
    const isFourthRound = clickedRestaurants.length === 3 && fourthRoundWinner === null;
    const isFifthRound = clickedRestaurants.length === 4 && fourthRoundWinner !== null;

    // Determine which restaurants to display based on the round
    let restaurantsToDisplay = [];
    if (isFifthRound) {
        // Fifth round: Display winner from fourth round and remaining restaurant
        const remainingRestaurant = clickedRestaurants[2];
        restaurantsToDisplay = [fourthRoundWinner, remainingRestaurant];
    } else if (isFourthRound) {
        // Fourth round: Display the first two restaurants clicked
        restaurantsToDisplay = clickedRestaurants.slice(0, 2);
    } else {
        // Default: Display restaurants from the main list based on startIndex
        restaurantsToDisplay = restaurants.slice(startIndex, startIndex + 2);
    }
    
    console.log('isFourthRound:', isFourthRound);
    console.log('isFifthRound:', isFifthRound);
    // console.log('startIndex:', startIndex);
    // console.log('clickedRestaurants:', clickedRestaurants);

    return (
        <>
            <div>
                <p>Game Screen</p>
                {/* {restaurants.length > 0 && restaurants.slice(startIndex, startIndex + 2).map((restaurant,i) => (
                    <button key={i} onClick={() => handleRestaurantClick(restaurant)}>
                        <RestaurantCard
                            restaurant={restaurant}
                        />
                    </button>
                ))} */}
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