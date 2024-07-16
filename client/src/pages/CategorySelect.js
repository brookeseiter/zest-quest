import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Checkbox,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    List,
    ListItem,
    ListItemPrefix,
    Typography,
    Button
} from "@material-tailwind/react";


const categories = [
    "American",
    "BBQ",
    "Chinese",
    "Indian",
    "Italian",
    "Japanese",
    "Mediterranean",
    "Mexican",
    "Middle Eastern",
    "Pizza",
    "Seafood",
    "Thai",
    "Vietnamese"
];

function CategorySelect() {
    const navigate = useNavigate();
    const [category1, setCategory1] = useState("");
    const [category2, setCategory2] = useState("");
    const [category3, setCategory3] = useState("");

    console.log('c1:', category1);
    console.log('c2:', category2);
    console.log('c3:', category3);

    const [checkedState, setCheckedState] = useState(
        new Array(categories.length).fill(false)
    );

    const handleOnChange = (position, e) => {
        if (checkedState.filter((i) => i).length >= 3 && e.target.checked) return;

        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );

        setCheckedState(updatedCheckedState);

         // Get the category value that is being checked or unchecked
        const selectedCategory = e.target.value;

        // Determine which category to update based on checked/unchecked state
        if (e.target.checked) {
            // If checkbox is checked, assign category value to the first available category slot
            if (!category1) {
                setCategory1(selectedCategory);
            } else if (!category2) {
                setCategory2(selectedCategory);
            } else if (!category3) {
                setCategory3(selectedCategory);
            }
        } else {
            // If checkbox is unchecked, remove category value from corresponding category slot
            if (category1 === selectedCategory) {
                setCategory1("");
            } else if (category2 === selectedCategory) {
                setCategory2("");
            } else if (category3 === selectedCategory) {
                setCategory3("");
            }
        }
    };

    const submitSettings = (e) => {
        e.preventDefault();
        const categoriesJSON = {
            'category_1': category1,
            'category_2': category2,
            'category_3': category3
        };

        const requestOptions = {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(categoriesJSON)
        };

        console.log('requestOptions', requestOptions);
        
        fetch(`/categories`, requestOptions)
            .then((response) => response.json())
            .then((gameSettingsData) => {
                console.log('gameSettingsData:', gameSettingsData);
                navigate('/load', { state: { gameSettings: gameSettingsData } });
            })
            .catch((error) => console.log('error: ', error), []); 
    };


    return (
        <>
            <div className="base flex justify-center items-center h-screen">
                <Card className="w-2/3 h-3/4">
                    <CardHeader
                        className="mb-4 grid place-items-center self-center overflow-visible w-4/5 h-1/5 bg-[#eb986f] text-white"
                    >
                        <Typography className="uppercase font-bold"> Step 2: Choose restaurant categories</Typography>
                    </CardHeader>
                    <form 
                        className="categories-form overflow-scroll" 
                        onSubmit={submitSettings}
                    >
                    <CardBody>
                        <List className="toppings-list">
                            {categories.map((name, index) => {
                                return (
                                    <ListItem key={index} className="p-0">
                                        <label
                                            htmlFor={`custom-checkbox-${index}`}
                                            className="flex w-full cursor-pointer items-center px-3 py-2"
                                        >
                                            <ListItemPrefix className="mr-3">
                                                <Checkbox
                                                    id={`custom-checkbox-${index}`}
                                                    ripple={false}
                                                    className="hover:before:opacity-0"
                                                    containerProps={{
                                                    className: "p-0",
                                                    }}
                                                    name={name}
                                                    value={name}
                                                    // ref={change}
                                                    checked={checkedState[index]}
                                                    onChange={(e) => handleOnChange(index, e)}
                                                    // disabled={ !toggles[index] && checkedCount >= 3 }
                                                />
                                            </ListItemPrefix>
                                            <Typography color="blue-gray" className="font-medium">
                                                {name}
                                            </Typography>
                                        </label>
                                    </ListItem>
                                );
                            })}
                        </List>
                    </CardBody>
                    <CardFooter className="object-contain flex justify-center mb-8 p-1">
                        <Button 
                            className="rounded-full hover:scale-[1.02] focus:scale-[1.02] active:scale-100 bg-[#eb986f]" 
                            size="md" 
                            type="submit"
                            variant="filled"
                        >
                            Submit Categories
                        </Button>
                    </CardFooter>
                    </form>
                </Card>
            </div>
        </>
    );
}

export default CategorySelect;
