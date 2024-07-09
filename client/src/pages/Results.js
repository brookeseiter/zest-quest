import { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { GameContext } from './GameContext';


function Results() {
    const { restaurants } = useContext(GameContext);
    const location = useLocation();
    const { gameSettings } = location.state;
    const [winnerYelpBusinessId, setWinnerYelpBusinessId] = useState('');
    const [rankedRestaurants, setRankedRestaurants] = useState([]);
    const [orderedRestaurants, setOrderedRestaurants] = useState([]);

    const getResults = async () => {    
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}        
        };
    
        const response = await fetch(`/final-results?gameSettingsId=${gameSettings.game_settings_id}`, requestOptions);
        if (!response.ok) {
            throw new Error("Failed to fetch final results");
        }

        const finalResultsData = await response.json();
        console.log('Final results retrieved:', finalResultsData);

        if (finalResultsData.length > 0) {
            setWinnerYelpBusinessId(finalResultsData[0]['yelp_business_id']);
            setRankedRestaurants(finalResultsData);
        }
    };

    useEffect(() => {
        getResults();
    }, []);

    useEffect(() => {
        if (rankedRestaurants.length > 0 && restaurants.length > 0) {
            const ordered = rankedRestaurants.map(ranked => 
                restaurants.find(restaurant => restaurant.id === ranked.yelp_business_id)
            );
            setOrderedRestaurants(ordered);
        }
    }, [rankedRestaurants, restaurants]);

    const winnerRestaurant = restaurants.find(restaurant => restaurant.id === winnerYelpBusinessId);

    console.log('restaurants:', restaurants);
    console.log('rankedRestaurants:', rankedRestaurants);
    console.log('winnerYelpBusinessId:', winnerYelpBusinessId);
    console.log('winnerRestaurant:', winnerRestaurant);
    console.log('orderedRestaurants:', orderedRestaurants);

    // return (
    //     <>
    //         <div>
    //             <p>Results Screen</p>
    //             <p>Winner:</p>
    //             {winnerRestaurant && (
    //                 <div>
    //                     <h2>{winnerRestaurant.name}</h2>
    //                     <img src={winnerRestaurant.image_url} alt={winnerRestaurant.name} />
    //                 </div>
    //             )}
    //             <h3>Ranked Restaurants:</h3>
    //             <table>
    //                 <tr>
    //                     <th>Rank</th>
    //                     <th>Name</th>
    //                     <th>Points</th>
    //                 </tr>
    //                 {orderedRestaurants.map((restaurant, index) => (
    //                     restaurant ? (
    //                         <li key={restaurant.id}>
    //                             <tr>
    //                                 <td>
    //                                     {index + 1}
    //                                 </td>
    //                                 <td>
    //                                     <img src={restaurant.image_url} alt={restaurant.name} width="100" />
    //                                     {restaurant.name}
    //                                 </td>
    //                                 <td>  
    //                                     <p>points go here</p>  
    //                                     {rankedRestaurants.map((restaurant) => (
    //                                         restaurant ? (
    //                                             <li key={restaurant.id}>
    //                                                 {restaurant.total_points}
    //                                             </li>
    //                                         ) : null
    //                                     ))}                            
    //                                 </td>
    //                             </tr>
    //                         </li>
    //                     ) : null
    //                 ))}
    //             </table>
    //         </div>
    //     </>
    // );
    return (
        <>
            <div>
                <p>Results Screen</p>
                <p>Winner:</p>
                {winnerRestaurant && (
                    <div>
                        <h2>{winnerRestaurant.name}</h2>
                        <img src={winnerRestaurant.image_url} alt={winnerRestaurant.name} />
                    </div>
                )}
                <h3>Ranked Restaurants:</h3>
                <table className='table-auto border'>
                    <thead>
                        <tr>
                            <th className='border'>Rank</th>
                            <th className='border'>Name</th>
                            <th className='border'>Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderedRestaurants.map((restaurant, index) => {
                            const rankedRestaurant = rankedRestaurants.find(ranked => ranked.yelp_business_id === restaurant.id);
                            return restaurant ? (
                                <tr key={restaurant.id}>
                                    <td className='border'>{index + 1}</td>
                                    <td className='border'>
                                        <img src={restaurant.image_url} alt={restaurant.name} width="100" />
                                        {restaurant.name}
                                    </td>
                                    <td className='border'>{rankedRestaurant ? rankedRestaurant.total_points : 'N/A'}</td>
                                </tr>
                            ) : null;
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Results;