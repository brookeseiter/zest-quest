import { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { GameContext } from './GameContext';
import RestaurantCard from "../components/RestaurantCard";
import { 
    CardHeader, 
    CardFooter, 
    CardBody, 
    Typography, 
    Card, 
    IconButton,
    Input,
    Select, 
    Option, 
    Radio,
    Button 
} from "@material-tailwind/react";


function Results() {
    const { restaurants } = useContext(GameContext);
    const location = useLocation();
    const navigate = useNavigate();
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

    const navigateToYelp = (url) => {
        if (url) {
            window.open(url, '_blank'); 
        }
    };

    console.log('restaurants:', restaurants);
    console.log('rankedRestaurants:', rankedRestaurants);
    console.log('winnerYelpBusinessId:', winnerYelpBusinessId);
    console.log('winnerRestaurant:', winnerRestaurant);
    console.log('orderedRestaurants:', orderedRestaurants);


    return (
        <>
            <div className='base w-full h-screen'>
                <Card className="flex flex-row rounded-full h-screen w-full justify-center items-center">
                    <div className="flex w-4/5 h-screen justify-center items-center"> 
                        {winnerRestaurant && (
                            <div className='flex flex-col w-2/5 scale-90'>
                                <div>
                                    <h1 className='flex justify-center font-sans font-semibold text-white text-4xl mb-4 bg-[#B7D799] shadow-lg rounded-lg'>Winner</h1>
                                </div>
                                <button onClick={() => navigateToYelp(winnerRestaurant.url)}>
                                    <RestaurantCard 
                                        classStyles="w-full object-cover" 
                                        restaurant={winnerRestaurant} 
                                    />
                                </button>
                                <div className='flex justify-center items-end mt-10'>
                                    <Button
                                        variant="gradient"
                                        color="white"
                                        ripple={true}
                                        onClick={() => navigate('/')}
                                        className="flex flex-row items-center rounded-full shadow-sm justify-center hover:scale-[1.03] focus:scale-[1.03] active:scale-95 p-2 bg-[#eb986f] text-white transition-transform duration-300 focus:outline-none focus:ring-4 focus:ring-[#d88760] hover:shadow-lg"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={2}
                                            stroke="currentColor"
                                            className="h-6 w-6 mr-1"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                                            />
                                        </svg>
                                        <div className="text-left leading-none">
                                            <span>Play</span><br />
                                            <span>again</span>
                                        </div>
                                    </Button>
                                </div>
                            </div>
                        )}
                        <div class="scale-table w-3/5 relative flex flex-col min-w-0 break-words shadow-lg rounded-lg bg-[#B7D799] text-white">
                            <div class="rounded-t mb-0 px-4 py-3 border-0">
                                <div class="flex flex-wrap items-center">
                                    <div class="relative w-full px-4 max-w-full flex-grow flex-1 ">
                                        <h3 class="font-semibold text-3xl text-white">Restaurant Rankings</h3>
                                    </div>
                                </div>
                            </div>
                            <div className='block w-full h-full overflow-y-auto overflow-x-auto'>
                                <table className='items-center w-full bg-transparent border-collapse'>
                                    <thead>
                                        <tr>
                                            {TABLE_HEAD.map((head) => (
                                                <th 
                                                    key={head}
                                                    className='text-[#eb986f] border-t-0 p-4 px-9 align-middle border border-solid py-3 uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-base text-left bg-[#C4E0A7] border-[#D9EDBF]'
                                                >
                                                    {head}
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
                                                    <td className={`border-t-0 px-6 align-middle border-l-0 border-r-0 border-[#D9EDBF] whitespace-nowrap p-4 ${classes}`}>
                                                        <span
                                                            className="font-bold text-white border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap"
                                                        >
                                                            {index + 1}
                                                        </span>
                                                    </td>
                                                    <td className={`border-t-0 px-6 align-middle border-l-0 border-r-0 border-[#D9EDBF] whitespace-nowrap p-4 ${classes}`}>
                                                        <div className="border-t-0 px-3 align-middle border-l-0 border-r-0 whitespace-nowrap text-left flex items-center">
                                                            <img 
                                                                className='h-16 w-16 border-[#eb986f] rounded-full border-2'
                                                                src={restaurant.image_url} 
                                                                alt={restaurant.name} 
                                                            />
                                                            <span
                                                                className="ml-3 text-lg font-bold text-white"
                                                            >
                                                                {restaurant.name}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className={`border-t-0 px-6 align-middle border-l-0 border-r-0 border-[#D9EDBF] whitespace-nowrap p-4 ${classes}`}>
                                                        <span
                                                            className="font-bold text-white border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4"
                                                        >
                                                            {rankedRestaurant ? rankedRestaurant.total_points : 'N/A'}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ) : null;
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div> 
                    </div>
                    {/* <Button
                        variant="gradient"
                        color="white"
                        ripple={true}
                        onClick={() => navigate('/')}
                        className="flex flex-row items-center justify-centertransition-all duration-300 ease-in-out shadow-lg -translate-y-2/4 p-2 rounded-lg bg-[#eb986f] text-white hover:bg-[#d88760]"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="h-4 w-4 mr-1"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                            />
                        </svg>
                        <div className="text-left leading-none">
                            <span>Play</span><br />
                            <span>again</span>
                        </div>
                    </Button> */}
                </Card>
            </div>

        </>
    );
}

export default Results;