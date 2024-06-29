import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { GameContext } from './GameContext';

function Load() {
    const {
        currentPlayer,
        setCurrentPlayer,
        currentCategoryIndex,
        setCurrentCategoryIndex,
        restaurants,
        setRestaurants,
    } = useContext(GameContext);
    const location = useLocation();
    const navigate = useNavigate();
    const { gameSettings } = location.state;
    const numPlayers = gameSettings.num_players;
    const categories = [gameSettings.category_1, gameSettings.category_2, gameSettings.category_3];
    const [loading, setLoading] = useState(false);

    const fetchRestaurantData = async (currCategory) => {
        setLoading(true);
    
        try {
            const response = await fetch(`/yelp-api?category=${currCategory}`);
            console.log(response);
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
    
            const yelpData = await response.json();
            console.log('Fetched data for category:', currCategory); // Log the fetched category
            console.log('yelpData:', yelpData);
            setRestaurants(yelpData.businesses);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const currentCategory = categories[currentCategoryIndex];
        fetchRestaurantData(currentCategory);
        console.log('currCategory:', currentCategory);
    }, [currentCategoryIndex, currentPlayer]); 

    const handlePlayGame = () => {
        setCurrentCategoryIndex(prev => (prev + 1) % 3); 
        navigate('/game', { state: { gameSettings: gameSettings }});
        if (currentCategoryIndex === 2 && currentPlayer < numPlayers) {
            setCurrentPlayer(prev => prev + 1);
        }
    };

    // console.log('gameSettings:', gameSettings);
    console.log('numPlayers:', numPlayers);
    // console.log('loading:', loading);
    // console.log('restaurants:', restaurants);
    // console.log('categories:', categories);
    console.log('currentPlayer:', currentPlayer);
    console.log('currentCategoryIndex:', currentCategoryIndex);

    return (
        <>
        <div>
            <h1>{gameSettings.category_1}</h1>
            <h1>{gameSettings.category_2}</h1>
            <h1>{gameSettings.category_3}</h1>
            <h2>Player {currentPlayer}, You're Up!</h2>
            <button onClick={handlePlayGame}>Play</button>
        </div>
        </>
    );
}

export default Load;





// Remember to handle cases where the gameSettings data may not be available in the location state, such as when the /load route is accessed directly without going through the CategorySelect component.