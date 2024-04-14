import { useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';

function Load() {
    const location = useLocation();
    const navigate = useNavigate();
    const { gameSettings } = location.state;
    const num_players = gameSettings.num_players;
    const [currentPlayer, setCurrentPlayer] = useState(1);

    const handlePlayGame = () => {
        // If there are more players remaining, navigate to the same page for the next player
        if (currentPlayer < num_players) {
            setCurrentPlayer(currentPlayer + 1);
            console.log('not last player of game');
        } else {
            // If all players have played, navigate to another page
            console.log('last player in game');
        }
        navigate('/game');
    };

    console.log(gameSettings);
    console.log(num_players);

    return (
        <>
        <div>
            <h1>{gameSettings.category_1}</h1>
            <h1>{gameSettings.category_2}</h1>
            <h1>{gameSettings.category_3}</h1>
            <h2>Player {currentPlayer}, You're Up!</h2>
            <button onClick={handlePlayGame}>Play</button>
        </div>
        </>
    );
}

export default Load;





// Remember to handle cases where the gameSettings data may not be available in the location state, such as when the /load route is accessed directly without going through the CategorySelect component.