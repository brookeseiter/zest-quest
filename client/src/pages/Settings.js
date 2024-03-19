import { useState } from "react";

function Settings() {
    const [numPlayers, setNumPlayers] = useState("");
    const [location, setLocation] = useState("");
    const [maxDist, setMaxDist] = useState("5 miles");

    const submitSettings = e => {
        const settingsJSON = {
            'num_players': numPlayers,
            'location': location,
            'max_dist': maxDist
        };
        console.log(settingsJSON);
    }

    console.log('numPlayers:', numPlayers);
    console.log('location:', location);
    console.log('maxDist:', maxDist);

    return (
        <>
            <div>
                <h1>Enter your preferences:</h1>
                <form className="settings-form" onSubmit={submitSettings}>
                    <label htmlFor="">
                        Number of Players:
                        <select 
                            name="numPlayers" 
                            value={numPlayers} 
                            onChange={(e) => setNumPlayers(e.target.value)}
                            required
                        >
                            <option disabled={true} value="">Choose a number between 1-5</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </label>
                    <label htmlFor="">
                        Address of your current location:
                        <input 
                            type="text" 
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required 
                        />
                    </label>
                    <p>How far are you willing to go?</p>
                    <div className="radio">
                        <label>
                            <input 
                                type="radio" 
                                value="5 miles" 
                                checked={maxDist === "5 miles"}
                                onChange={(e) => setMaxDist(e.target.value)}
                            />
                            5 miles
                        </label>
                    </div>
                    <div className="radio">
                        <label>
                            <input 
                                type="radio" 
                                value="10 miles" 
                                checked={maxDist === "10 miles"}
                                onChange={(e) => setMaxDist(e.target.value)}
                            />
                            10 miles
                        </label>
                    </div>
                    <div className="radio">
                        <label>
                            <input 
                                type="radio" 
                                value="15 miles" 
                                checked={maxDist === "15 miles"}
                                onChange={(e) => setMaxDist(e.target.value)}
                                // onChange={updateMaxDist}
                            />
                            15 miles
                        </label>
                    </div>
                    <button>Submit Preferences</button>
                </form>
            </div>
        </>
    );
}

export default Settings;