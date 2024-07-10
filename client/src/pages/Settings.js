import { useState } from "react";
import { useNavigate } from "react-router-dom";
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


function Settings() {
    const navigate = useNavigate();
    const [numPlayers, setNumPlayers] = useState("");
    const [location, setLocation] = useState("");
    const [maxDist, setMaxDist] = useState("5");

    const handleSelectChange = (value) => {
        setNumPlayers(value);
    };

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

    return (
        <>
            <div className="base flex justify-center items-center">
                <Card className="w-2/3 h-3/4">
                    <CardHeader
                        variant="solid"
                        className="bg-[#eb986f] text-white mb-4 grid h-28 place-items-center"
                    >
                        <Typography className="uppercase font-bold"> Step 1: Enter your preferences</Typography>
                    </CardHeader>
                    <CardBody>
                        <form className="settings-form flex w-72 flex-col gap-6" onSubmit={submitSettings}>
                            <Select 
                                className="shadow-inner focus:outline-none bg-white"
                                variant="outlined" 
                                label="Number of Players:"
                                name="numPlayers" 
                                value={numPlayers} 
                                // onChange={(e) => setNumPlayers(e.target.value)}
                                onChange={handleSelectChange}
                                required
                            >
                                <Option className="" disabled={true} value="">Choose a number</Option>
                                <Option className="" value="1">1</Option>
                                <Option value="2">2</Option>
                                <Option value="3">3</Option>
                                <Option value="4">4</Option>
                                <Option value="5">5</Option>
                            </Select>

                            {/* <Input 
                                className="block w-full rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                variant="outlined" 
                                type="text" 
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                required 
                                label="Address of your current location:" 
                                size="lg" 
                            /> */}
                            <div className="relative">
                                <Input 
                                    // className="location-input peer w-full h-full text-blue-gray-700 font-sans font-normal text-left outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 disabled:cursor-not-allowed transition-all border text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 border-t-transparent shadow-inner focus:outline-none bg-white" 
                                    className="location-input"
                                    variant="outlined" 
                                    type="text" 
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    required 
                                    id="location" 
                                    size="lg" 
                                />
                                <label 
                                    htmlFor="location-input" 
                                    className="flex w-full h-full absolute -top-1.5 before:w-2.5 before:mt-[6.5px] before:mr-1 before:rounded-tl-md after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 after:rounded-tr-md after:pointer-events-none after:transition-all text-[11px] before:border-t before:border-l after:border-t after:border-r leading-tight  text-blue-gray-400 before:border-blue-gray-200 after:border-blue-gray-200"
                                    // in the middle of the input, below 
                                    // className="absolute top-1/2 transform -translate-y-1/2 left-3 text-blue-gray-400 pointer-events-none text-[11px] transition-all peer-placeholder-shown:top-2/4 peer-placeholder-shown:-translate-y-2/4 peer-placeholder-shown:left-3 peer-placeholder-shown:text-base peer-focus:top-1/2 peer-focus:-translate-y-1/2 peer-focus:left-3 peer-focus:text-[11px]"
                                >
                                    Address of your current location:
                                </label>
                            </div>
                        

                            <Typography>How far are you willing to go?</Typography>
                            <Radio 
                                value="5" 
                                checked={maxDist === "5"}
                                onChange={(e) => setMaxDist(e.target.value)}
                                name="type"
                                label="5 miles" 
                                defaultChecked 
                            />
                            <Radio 
                                value="10" 
                                checked={maxDist === "10"}
                                onChange={(e) => setMaxDist(e.target.value)}
                                name="type" 
                                label="10 miles" 
                                defaultChecked 
                            />
                            <Radio 
                                value="15" 
                                checked={maxDist === "15"}
                                onChange={(e) => setMaxDist(e.target.value)}
                                name="type" 
                                label="15 miles" 
                                defaultChecked 
                            />
                            <CardFooter className="">
                                <Button 
                                    className="rounded-full hover:scale-[1.02] focus:scale-[1.02] active:scale-100 bg-[#eb986f]" 
                                    size="md" 
                                    type="submit"
                                    variant="filled"
                                >
                                    Submit Preferences
                                </Button>
                            </CardFooter>
                        </form>
                    </CardBody>
                </Card>
            </div>
        </>
    );
}

export default Settings;

