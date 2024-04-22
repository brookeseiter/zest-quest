import { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import RestaurantCard from "../components/RestaurantCard";


function Game() {
    const location = useLocation();
    const { restaurants } = location.state;

    console.log('restaurants:', restaurants);

    return (
        <>
            <div>
                <p>Game Screen</p>
                {restaurants.length > 0 && restaurants.map((restaurant,i) => (
                    <div>
                        <RestaurantCard
                            key={i}
                            restaurant={restaurant}
                        />
                    </div>
                ))};
            </div>
        </>
    );
}

export default Game;