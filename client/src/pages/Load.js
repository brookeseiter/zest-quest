import { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';

function Load() {
    const location = useLocation();
    const navigate = useNavigate();
    const { gameSettings } = location.state;
    const numPlayers = gameSettings.num_players;
    const categories = [gameSettings.category_1, gameSettings.category_2, gameSettings.category_3];
    const [currentPlayer, setCurrentPlayer] = useState(1);
    const [loading, setLoading] = useState(false);
    const [restaurants, setRestaurants] = useState([]);

    const fetchRestaurantData = async (currCategory) => {
        setLoading(true);
    
        try {
            const response = await fetch(`/yelp-api?category=${currCategory}`);
            console.log(response);
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
    
            const yelpData = await response.json();
            console.log(yelpData);
            setRestaurants(yelpData.businesses);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchRestaurantData();
    }, []); 

    const handlePlayGame = () => {
        if (currentPlayer < numPlayers) {
            setCurrentPlayer(currentPlayer + 1);
            console.log('not last player of game');
        } else {
            console.log('last player in game');
        }
        navigate('/game', { state: { restaurants: restaurants, gameSettings: gameSettings }});
    };

    console.log('gameSettings:', gameSettings);
    console.log('numPlayers:', numPlayers);
    console.log('loading:', loading);
    console.log('restaurants:', restaurants);
    console.log('categories:', categories);

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