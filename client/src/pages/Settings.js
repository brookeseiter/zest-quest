import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CardHeader, Card, Select, Option, Button } from "@material-tailwind/react";


function Settings() {
    const navigate = useNavigate();
    const [numPlayers, setNumPlayers] = useState("");
    const [location, setLocation] = useState("");
    const [maxDist, setMaxDist] = useState("5");

    const submitSettings = (e) => {
        e.preventDefault();
        const settingsJSON = {
            'num_players': numPlayers,
            'location': location,
            'max_dist': maxDist
        };

        console.log('settingsJSON:'. settingsJSON);

        const requestOptions = {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(settingsJSON)
        };

        console.log(requestOptions);
        
        fetch(`/settings`, requestOptions)
        .then((response) => response.json())
        .then((settingsData) => {
            console.log(settingsData);
            navigate('/categories');
        })
        .catch((error) => {
            console.log('error: ', error);
        }, []); 
    };

    console.log('numPlayers:', numPlayers);
    console.log('location:', location);
    console.log('maxDist:', maxDist);
    // Roboto, sans-serif 

    return (
        <>
            <div className="base flex justify-center items-center">
                <Card className="w-2/3 h-3/4">
                <CardHeader
                    variant="solid"
                    className="bg-[#eb986f] text-white mb-4 grid h-28 place-items-center"
                >
                    <h1 className="uppercase font-bold"> Step 1: Enter your preferences</h1>
                </CardHeader>
                    <form className="settings-form flex w-72 flex-col gap-6" onSubmit={submitSettings}>
                        <Select 
                            className="shadow-inner focus:outline-none bg-white"
                            variant="outlined" 
                            label="Number of Players:"
                            name="numPlayers" 
                            value={numPlayers} 
                            onChange={(e) => setNumPlayers(e.target.value)}
                            required
                        >
                            <Option className="" disabled={true} value="">Choose a number</Option>
                            <Option className="" value="1">1</Option>
                            <Option value="2">2</Option>
                            <Option value="3">3</Option>
                            <Option value="4">4</Option>
                            <Option value="5">5</Option>
                        </Select>
                        <label htmlFor="">
                            Number of Players:
                            <select 
                                className="flex flex-row justify-between w-48 px-2 py-2 text-gray-700 bg-white border-2 border-white rounded-md shadow focus:outline-none focus:border-blue-600"
                                // className="@click="show = ! show" class="mt-4 border-0 block bg-blue-600 text-gray-200 rounded-lg px-6 text-sm py-3 overflow-hidden focus:outline-none focus:border-white"
                                name="numPlayers" 
                                value={numPlayers} 
                                onChange={(e) => setNumPlayers(e.target.value)}
                                required
                            >                            
                                <option className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white" disabled={true} value="">Choose a number</option>
                                <option className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white" value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </label>
                        <label className="flex items-center" htmlFor="">
                            Address of your current location:
                            <input 
                                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                                    value="5" 
                                    checked={maxDist === "5"}
                                    onChange={(e) => setMaxDist(e.target.value)}
                                />
                                5 miles
                            </label>
                        </div>
                        <div className="radio">
                            <label>
                                <input 
                                    type="radio" 
                                    value="10" 
                                    checked={maxDist === "10"}
                                    onChange={(e) => setMaxDist(e.target.value)}
                                />
                                10 miles
                            </label>
                        </div>
                        <div className="radio">
                            <label>
                                <input 
                                    type="radio" 
                                    value="15" 
                                    checked={maxDist === "15"}
                                    onChange={(e) => setMaxDist(e.target.value)}
                                    // onChange={updateMaxDist}
                                />
                                15 miles
                            </label>
                        </div>
                        <Button 
                            className="rounded-full hover:scale-[1.02] focus:scale-[1.02] active:scale-100 bg-[#eb986f]" 
                            size="md" 
                            variant="filled"
                        >
                            Submit Preferences
                        </Button>
                    </form>
                </Card>
            </div>
        </>
    );
}

export default Settings;

