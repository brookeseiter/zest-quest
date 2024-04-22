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
                <RestaurantCard
                restaurant={restaurants[0]}
                // onClick={removeFromBack}
                />
                <h1>VS</h1>
                <RestaurantCard
                restaurant={restaurants[1]}
                // onClick={removeFromBack}
                />
            </div>
        </>
    );
}

export default Game;