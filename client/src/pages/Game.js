import { useState, useEffect } from "react";


function Game() {
    const [loading, setLoading] = useState(false);
    const [restaurants, setRestaurants] = useState([]);

    // const fetchRestaurantData = () => {
    //     setLoading(true);
    //     fetch(`/yelp-api`)
    //         .then((response) => response.json())
    //         .then((yelpData) => {
    //             setRestaurants(yelpData.businesses);
    //             // setRestaurants(yelpData);
    //         })
    //         .catch((error) => console.log('error: ', error), [])
    //         .finally(() => setLoading(false));
    // }
    const fetchRestaurantData = async () => {
        setLoading(true);
    
        try {
            const response = await fetch(`/yelp-api`);
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

    console.log('loading:', loading);
    console.log('restaurants:', restaurants);

    return (
        <>
        <div>
            <p>Game Screen</p>
            {/* {loading ? loading:restaurants.url} */}
        </div>
        </>
    );
}

export default Game;