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

    const handleInputChange = (value) => {
        setLocation(value);
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
                        variant="gradient"
                        className="mb-4 grid place-items-center self-center overflow-visible w-4/5 h-1/5 bg-[#eb986f] text-white"
                    >
                        <Typography className="uppercase font-bold"> Step 1: Enter your preferences</Typography>
                    </CardHeader>
                    <CardBody className="h-4/5 p-6">
                        <form 
                            className="settings-form flex flex-col w-full h-full" 
                            onSubmit={submitSettings}
                        >
                            <div className="flex flex-row gap-8 w-full h-full">
                                <div className="flex flex-col h-full w-1/2 justify-around">
                                    <Select 
                                        className="shadow-inner focus:outline-none bg-white"
                                        variant="outlined" 
                                        label="Number of Players:"
                                        name="numPlayers" 
                                        value={numPlayers} 
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
                                    {/* desired label classes: className="flex w-full h-full absolute -top-1.5 before:w-2.5 before:mt-[6.5px] before:mr-1 before:rounded-tl-md after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 after:rounded-tr-md after:pointer-events-none after:transition-all text-[11px] before:border-t before:border-l after:border-t after:border-r leading-tight  text-blue-gray-400 before:border-blue-gray-200 after:border-blue-gray-200" */}
                                    <div className="relative mt-4">
                                        <Input 
                                            className="location-input peer w-full h-full text-blue-gray-700 font-sans font-normal text-left outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 transition-all border text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 border-t-transparent shadow-inner focus:outline-none bg-white" 
                                            variant="static" 
                                            value={location}
                                            label="Address of your current location:" 
                                            onChange={(e) => setLocation(e.target.value)}
                                            id="location" 
                                            size="lg" 
                                            required 
                                            containerProps={{
                                                className: 'label-hidden-required-span'    
                                            }}
                                            labelProps={{ className: "custom-label" }} 
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col h-full w-1/2">
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
                                </div>
                            </div>
                            <CardFooter className="object-contain flex justify-center mt-6">
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

