import { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import RestaurantCard from "../components/RestaurantCard";


function Game() {
    const location = useLocation();
    const navigate = useNavigate();
    const { restaurants, gameSettings } = location.state;
    const [startIndex, setStartIndex] = useState(0);

    console.log('restaurants:', restaurants);

    const handleRestaurantClick = () => {
        setStartIndex(startIndex + 2);
        console.log('clicked');
    };

    useEffect(() => {
        if (startIndex === 4) {
            navigate('/load', { state: { gameSettings: gameSettings } });
        }
    }, [startIndex, gameSettings, navigate]);

    console.log('start index:', startIndex);

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