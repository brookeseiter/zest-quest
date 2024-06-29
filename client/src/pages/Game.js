import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import RestaurantCard from "../components/RestaurantCard";
import { GameContext } from './GameContext';


function Game() {
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
    const [startIndex, setStartIndex] = useState(0);

    const handleRestaurantClick = () => {
        setStartIndex(startIndex + 1);
    };

    useEffect(() => {
        if (startIndex === 1) {
            navigate('/load', { state: { gameSettings: gameSettings } });
        }
    }, [startIndex, navigate]);

    // console.log('start index:', startIndex);

    return (
        <>
            <div>
                <p>Game Screen</p>
                {restaurants.length > 0 && restaurants.slice(startIndex, startIndex + 2).map((restaurant,i) => (
                    <button key={i} onClick={handleRestaurantClick}>
                        <RestaurantCard
                            restaurant={restaurant}
                        />
                    </button>
                ))}
            </div>
        </>
    );
}

export default Game;