import { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { GameContext } from './GameContext';
import { 
    CardHeader, 
    CardFooter, 
    CardBody, 
    Typography, 
    Card, 
    Input,
    Select, 
    Option, 
    Radio,
    Button 
} from "@material-tailwind/react";


function Results() {
    const { restaurants } = useContext(GameContext);
    const location = useLocation();
    const { gameSettings } = location.state;
    const [winnerYelpBusinessId, setWinnerYelpBusinessId] = useState('');
    const [rankedRestaurants, setRankedRestaurants] = useState([]);
    const [orderedRestaurants, setOrderedRestaurants] = useState([]);
    const TABLE_HEAD = ["Rank", "Name", "Points"]

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


    return (
        <>
            {/* <div className='base'>
                <Card className="flex flex-row rounded-full h-full w-full overflow-scroll justify-center items-center">
                    {winnerRestaurant && (
                        <div className='w-1/2'>
                            <h2>{winnerRestaurant.name}</h2>
                            <img className="" src={winnerRestaurant.image_url} alt={winnerRestaurant.name} />
                        </div>
                    )}
                    <table className='rounded-2xl w-1/2 min-w-max table-auto text-left'>
                        <thead className='rounded-2xl'>
                            <tr>
                                {TABLE_HEAD.map((head) => (
                                    <th 
                                        key={head}
                                        className='border-b border-blue-gray-100 bg-blue-gray-50 p-4'
                                    >
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal leading-none opacity-70"
                                        >
                                            {head}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {orderedRestaurants.map((restaurant, index) => {
                                const rankedRestaurant = rankedRestaurants.find(ranked => ranked.yelp_business_id === restaurant.id);
                                const isLast = index === orderedRestaurants.length - 1;
                                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                                return restaurant ? (
                                    <tr key={restaurant.id}>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {index + 1}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <div className="flex items-center space-x-2">
                                                <img src={restaurant.image_url} alt={restaurant.name} className="w-20 h-20 object-cover" />
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {restaurant.name}
                                                </Typography>
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {rankedRestaurant ? rankedRestaurant.total_points : 'N/A'}
                                            </Typography>
                                        </td>
                                    </tr>
                                ) : null;
                            })}
                        </tbody>
                    </table>
                </Card>
            </div> */}
            <div className='base'>
                <Card className="flex flex-row rounded-full h-full w-full justify-center items-center">
                    <div className="scale-75 flex w-full h-full justify-center items-center"> 
                        {winnerRestaurant && (
                            <div className='flex flex-col w-1/2 h-full'>
                                <img className="w-full h-auto max-h-full object-cover" src={winnerRestaurant.image_url} alt={winnerRestaurant.name} />
                                <Typography>{winnerRestaurant.name}</Typography>
                            </div>
                        )}
                        <div className='flex flex-col w-1/2 h-full overflow-auto rounded-2xl'>
                            <table className='w-full h-full table-auto text-left max-h-full overflow-scroll'>
                                <thead className='w-full rounded-2xl'>
                                    <tr>
                                        {TABLE_HEAD.map((head) => (
                                            <th 
                                                key={head}
                                                className='border-b border-blue-gray-100 bg-blue-gray-50 p-4'
                                            >
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal leading-none opacity-70"
                                                >
                                                    {head}
                                                </Typography>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {orderedRestaurants.map((restaurant, index) => {
                                        const rankedRestaurant = rankedRestaurants.find(ranked => ranked.yelp_business_id === restaurant.id);
                                        const isLast = index === orderedRestaurants.length - 1;
                                        const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                                        return restaurant ? (
                                            <tr key={restaurant.id}>
                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {index + 1}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <div className="flex items-center space-x-2">
                                                        <img src={restaurant.image_url} alt={restaurant.name} className="w-20 h-20 object-cover" />
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal"
                                                        >
                                                            {restaurant.name}
                                                        </Typography>
                                                    </div>
                                                </td>
                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {rankedRestaurant ? rankedRestaurant.total_points : 'N/A'}
                                                    </Typography>
                                                </td>
                                            </tr>
                                        ) : null;
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div> 
                </Card>
            </div>

        </>
    );
}

export default Results;