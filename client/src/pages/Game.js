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
        startIndex,
        setStartIndex
    } = useContext(GameContext);
    const location = useLocation();
    const navigate = useNavigate();
    const { gameSettings } = location.state;
    // const [startIndex, setStartIndex] = useState(0);

    useEffect(() => {
        if (startIndex === restaurants.length) {
            setStartIndex(0);
        }
    }, [startIndex, restaurants.length]);

    const handleRestaurantClick = () => {
        setStartIndex(startIndex + 2);
        navigate('/load', { state: { gameSettings: gameSettings } });
    };

    // if (startIndex === restaurants.length) {
    //     setStartIndex(0)
    // }

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