import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
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

function Load() {
    const {
        currentPlayer,
        setCurrentPlayer,
        currentCategoryIndex,
        setCurrentCategoryIndex,
        restaurants,
        setRestaurants,
        clickedRestaurants,
        setClickedRestaurants,
        startIndex,
        setStartIndex,
        fourthRoundWinner,
        setFourthRoundWinner,
        round,
        setRound
    } = useContext(GameContext);
    const location = useLocation();
    const navigate = useNavigate();
    const { gameSettings } = location.state;
    const numPlayers = gameSettings.num_players;
    const categories = [gameSettings.category_1, gameSettings.category_2, gameSettings.category_3];
    const [loading, setLoading] = useState(false);

    const fetchRestaurantData = async (currCategory) => {
        setLoading(true);
    
        try {
            const response = await fetch(`/yelp-api?category=${currCategory}`);
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
    
            const yelpData = await response.json();
            // console.log('yelpData:', yelpData);
            if (!restaurants) {
                setRestaurants(yelpData.businesses);
            }
            else {
                setRestaurants((prevRestaurants) => [
                    ...prevRestaurants,
                    ...yelpData.businesses,
                ]);
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const currentCategory = categories[currentCategoryIndex];
        if (restaurants.length < 6) {
            fetchRestaurantData(currentCategory);
        }
    }, [currentCategoryIndex, currentPlayer]); 

    useEffect(() => {
        if (clickedRestaurants.length === 5 && currentPlayer < numPlayers) {
            setCurrentPlayer(prev => prev + 1);
            setClickedRestaurants([]);
            setStartIndex(0);
            setCurrentCategoryIndex(0);
            setFourthRoundWinner(null);
        }
        if (clickedRestaurants.length === 5 && currentPlayer === numPlayers) {
            navigate('/results', { state: { gameSettings: gameSettings } });
        }
    }, [currentCategoryIndex, currentPlayer]);     

    const handlePlayGame = () => {
        setCurrentCategoryIndex(prev => (prev + 1) % 3);
        navigate('/game', { state: { gameSettings: gameSettings } });
    };

    const formatCategoryName = (categoryName) => {
        return categoryName.replace(/ /g, '-');
    };
    
    // console.log('startIndex Load:', startIndex);
    // console.log('clickedRestaurants:', clickedRestaurants);
    // console.log('gameSettings:', gameSettings);
    // console.log('numPlayers:', numPlayers);
    // console.log('loading:', loading);
    // console.log('restaurants:', restaurants);
    // console.log('categories:', categories);
    // console.log('currentPlayer:', currentPlayer);
    // console.log('currentCategoryIndex:', currentCategoryIndex);

    return (
        <>
            <div className="base h-screen flex items-center justify-center">
                <Card className="w-2/3 h-3/4">
                    <CardHeader
                        variant="gradient"
                        className="mb-4 grid place-items-center self-center overflow-visible w-4/5 h-1/5 bg-[#eb986f] text-white"
                    >
                        <Typography className="text-center uppercase font-bold"> 
                            Player {currentPlayer}, You're Up!
                        </Typography>
                    </CardHeader>
                    <CardBody className="flex flex-row w-full h-4/5 p-6 justify-around">
                        {/* <div className="flex flex-col justify-center items-center space-x-4"> */}
                        <div className="flex flex-col justify-center items-center">
                            {/* <div className="flex justify-end items-end"> */}
                                <img 
                                    className="w-40 h-40" 
                                    src={`../images/${formatCategoryName(gameSettings.category_1)}.svg`} 
                                    alt="" 
                                />
                            {/* </div> */}
                                <h1 className="text-center">{gameSettings.category_1}</h1>
                        </div>
                        {/* <div className="flex flex-col justify-center items-center space-y-2"> */}
                        <div className="flex flex-col justify-center items-center">
                            <img 
                                className="w-40 h-40" 
                                src={`../images/${formatCategoryName(gameSettings.category_2)}.svg`} 
                                alt="" 
                            />
                            <h1 className="text-center">{gameSettings.category_2}</h1>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <img 
                                className="w-40 h-40" 
                                src={`../images/${formatCategoryName(gameSettings.category_3)}.svg`} 
                                alt="" 
                            />
                            <h1 className="text-center">{gameSettings.category_3}</h1>
                        </div>
                    </CardBody>
                    <CardFooter className="object-contain flex flex-col justify-center">
                        <Typography className="text-center uppercase font-bold"> 
                            Round {round}
                        </Typography>
                        <Button 
                            className="rounded-full shadow-sm hover:scale-[1.03] focus:scale-[1.03] active:scale-95 transition-transform duration-300 focus:outline-none focus:ring-4 focus:ring-[#d88760] hover:shadow-lg bg-[#eb986f]" 
                            size="lg" 
                            type="submit"
                            variant="filled"
                            onClick={handlePlayGame}
                        >
                            Play 
                        </Button>
                    </CardFooter>                    
                </Card>
            </div>
        </>
    );
}

export default Load;





