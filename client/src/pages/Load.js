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

    const currentCategoryBounce = (round, index) => {
        // Define a mapping for synonymous categories
        const categoryMappings = {
            "Mexican": ["Mexican", "Tacos", "Latin American"]
        };
    
        // For rounds 1, 2, 3 - apply bounce to the corresponding category
        if (round === index + 1) {
            return true;
        }
    
        // For round 4, make the first two categories bounce
        if (round === 4 && index < 2) {
            return true;
        }

        // if (round === 5 && fourthRoundWinner) {
        //     const winnerTitles = fourthRoundWinner.categories.map(cat => cat.title);
        //     console.log('winnerTitles:', winnerTitles);
        // }
    
        // For round 5, find the index of the fourthRoundWinner.category title
        if (round === 5 && fourthRoundWinner) {
            // Extract titles from fourthRoundWinner's categories
            const winnerTitles = fourthRoundWinner.categories.map(cat => cat.title);
    
            // Normalize categories to account for synonyms
            const normalizedCategories = categories.map(cat => {
                // Check if the category has synonyms in the mapping
                if (categoryMappings[cat]) {
                    // Return the matched category if synonyms include a winner title
                    return categoryMappings[cat].find(mapping => winnerTitles.includes(mapping)) || cat;
                }
                return cat;
            });
    
            // Find the matching index in normalized categories
            const fourthWinnerIndex = normalizedCategories.findIndex(cat => winnerTitles.includes(cat));
    
            // Apply bounce if index matches the found index or is the last category
            if (index === fourthWinnerIndex || index === 2) {
                return true;
            }
        }
    
        return false;    
    };
    
    // console.log('startIndex Load:', startIndex);
    // console.log('clickedRestaurants:', clickedRestaurants);
    console.log('gameSettings:', gameSettings);
    // console.log('numPlayers:', numPlayers);
    // console.log('loading:', loading);
    // console.log('restaurants:', restaurants);
    // console.log('categories:', categories);
    // console.log('currentPlayer:', currentPlayer);
    // console.log('currentCategoryIndex:', currentCategoryIndex);
    // console.log('round:', round);
    console.log('fourthRoundWinner load.js:', fourthRoundWinner);

    return (
        <>
            <div className="base h-screen flex items-center justify-center">
                <Card className="w-2/3 h-3/4">
                    <CardHeader
                        variant="gradient"
                        className="mb-4 grid place-items-center self-center overflow-visible w-4/5 h-1/5 bg-[#eb986f] text-white"
                    >
                        {/* <Typography className="dynapuff-bold text-3xl text-center uppercase font-bold">  */}
                        {/* <Typography className="sniglet text-3xl text-center uppercase">  */}
                        <Typography className="modak text-3xl text-center uppercase"> 
                            Player {currentPlayer}, You're Up!
                        </Typography>
                    </CardHeader>
                    <CardBody className="flex flex-row w-full h-4/5 p-6 justify-around">
                        {/* <div className="flex flex-col justify-center items-center space-x-4"> */}
                        {/* <div className="flex flex-col justify-center items-center space-y-2"> */}
                        {categories.map((category, i) => (
                            <div key={i} className="flex flex-col justify-center items-center">
                                <img 
                                    className={`w-40 h-40 ${currentCategoryBounce(round, i, category) ? 'animate-bounce' : ''}`}
                                    src={`../images/${formatCategoryName(category)}.svg`} 
                                    alt="" 
                                />
                                <h1 className="text-center">{category}</h1>
                            </div>
                        ))}
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





