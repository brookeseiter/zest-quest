import { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import RestaurantCard from "../components/RestaurantCard";


function Game() {
    const location = useLocation();
    const { restaurants } = location.state;
    const [startIndex, setStartIndex] = useState(0);

    console.log('restaurants:', restaurants);

    const handleRestaurantClick = () => {
        // Increment startIndex to move to the next set of restaurants
        setStartIndex(startIndex + 2);
        console.log('clicked');
    };

    // useEffect(() => {
    //     handleRestaurantClick();
    // }, []); 

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