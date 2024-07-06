import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function Results() {
    const location = useLocation();
    const { gameSettings } = location.state;

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
    };

    useEffect(() => {
        getResults();
    }, []);

    return (
        <>
            <div>
                <p>Results Screen</p>
            </div>
        </>
    );
}

export default Results;