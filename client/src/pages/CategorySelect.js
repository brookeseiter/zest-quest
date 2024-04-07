import { useState } from "react";
// import Checkbox from "../components/Checkbox";

// const categories = [
//     {
//       name: "American",
//       price: 1.2
//     },
//     {
//       name: "BBQ",
//       price: 2.0
//     },
//     {
//       name: "Fast Food",
//       price: 2.5
//     },
//     {
//       name: "Chinese",
//       price: 3.0
//     }
// ];
const categories = ["American","BBQ","Fast Food","Chinese"];

// const getFormattedPrice = (price) => `$${price.toFixed(2)}`;

function CategorySelect() {
    // const [american, setAmerican] = useState(false);
    // const [bbq, setBbq] = useState(false);
    // const [chinese, setChinese] = useState(false);
    // const [fastFood, setFastFood] = useState(false);

    // const handleAmerican = (e) => {
    //     setAmerican(e.target.checked);
    //     console.log(e.target.checked, e.target.name);
    // };

    // const handleBbq = (e) => {
    //     setBbq(e.target.checked);
    //     console.log(e.target.checked, e.target.name);
    // };

    // const handleChinese = (e) => {
    //     setChinese(e.target.checked);
    //     console.log(e.target.checked, e.target.name);
    // };

    // const handleFastFood = (e) => {
    //     setFastFood(e.target.checked);
    //     console.log(e.target.checked, e.target.name);
    // };

    // const [total, setTotal] = useState(0);

    const [category1, setCategory1] = useState("");
    const [category2, setCategory2] = useState("");
    const [category3, setCategory3] = useState("");
    const [chosen, setChosen] = useState([]);

    const [checkedState, setCheckedState] = useState(
        new Array(categories.length).fill(false)
    );
    console.log('checkedState', checkedState);

    const handleOnChange = (position, e) => {
        if (checkedState.filter((i) => i).length >= 3 && e.target.checked) return;

        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );
    
        setCheckedState(updatedCheckedState);
    
        // const totalPrice = updatedCheckedState.reduce((sum, currentState, index) => {
        //     if (currentState === true) {
        //         return sum + categories[index].price;
        //     }
        //     return sum;
        // }, 0);
    
        // setTotal(totalPrice);
    };

    // const submitSettings = (e) => {
    //     e.preventDefault();
    //     const categoriesJSON = {
    //         'category_1': numPlayers,
    //         'category_2': location,
    //         'category_3': maxDist
    //     };

    //     const requestOptions = {
    //         method: 'POST',
    //         headers: {'content-type': 'application/json'},
    //         body: JSON.stringify(categoriesJSON)
    //     };

    //     console.log('requestOptions', requestOptions);
        
    //     fetch(`/categories`, requestOptions)
    //     .then((response) => response.json())
    //     .then((categoriesData) => {
    //         console.log('categoriesData', categoriesData);
    //         navigate('/load');
    //     })
    //     .catch((error) => {
    //         console.log('error: ', error);
    //     }, []); 
    // };
    console.log('chosen',chosen);


    return (
        <>
            <div>
            <h1>Choose restaurant categories:</h1>
                <form className="categories-form">
                    <ul className="toppings-list">
                        {/* {categories.map(({ name, price }, index) => { */}
                        {categories.map((name, index) => {
                            return (
                                <li key={index}>
                                    <div className="toppings-list-item">
                                        <div className="left-section">
                                            <input
                                                type="checkbox"
                                                id={`custom-checkbox-${index}`}
                                                name={name}
                                                value={name}
                                                checked={checkedState[index]}
                                                // onChange={(e) => handleOnChange(index, e)}
                                                onChange={(e) => {
                                                    handleOnChange(index, e);
                                                    chosen.push(name);
                                                }}
                                            />
                                            <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
                                        </div>
                                        {/* <div className="right-section">{getFormattedPrice(price)}</div> */}
                                    </div>
                                </li>
                            );
                        })}
                    {/* <li>
                        <div className="toppings-list-item">
                            <div className="left-section">Total:</div>
                            <div className="right-section">{getFormattedPrice(total)}</div>
                        </div>
                    </li> */}
                    </ul>
                    {/* <label htmlFor="american">
                        <input
                            type="checkbox"
                            name="american"
                            id="american"
                            checked={american}
                            onChange={handleAmerican}
                            required
                        />
                            American
                    </label>
                    <label htmlFor="">
                        <input
                            type="checkbox"
                            name="bbq"
                            checked={checked}
                            onChange={handleChecked}
                            required
                        />
                            BBQ
                    </label>
                    <Checkbox
                        label="American"
                        name="american"
                        value={american}
                        onChange={handleAmerican}
                    />
                    <Checkbox
                        label="Barbeque"
                        name="bbq"
                        value={bbq}
                        onChange={handleBbq}
                    />
                    <Checkbox
                        label="Chinese"
                        name="chinese"
                        value={chinese}
                        onChange={handleChinese}
                    />
                    <Checkbox
                        label="Fast Food/Casual"
                        name="fastFood"
                        value={fastFood}
                        onChange={handleFastFood}
                    />
                    <Checkbox
                        label="Indian"
                        value={checked}
                        onChange={handleChecked}
                    />
                    <Checkbox
                        label="Italian"
                        value={checked}
                        onChange={handleChecked}
                    />
                    <Checkbox
                        label="Japanese"
                        value={checked}
                        onChange={handleChecked}
                    />
                    <Checkbox
                        label="Mediterranean"
                        value={checked}
                        onChange={handleChecked}
                    />
                    <Checkbox
                        label="Mexican"
                        value={checked}
                        onChange={handleChecked}
                    />
                    <Checkbox
                        label="Middle Eastern"
                        value={checked}
                        onChange={handleChecked}
                    />
                    <Checkbox
                        label="Pizza"
                        value={checked}
                        onChange={handleChecked}
                    />
                    <Checkbox
                        label="Seafood"
                        value={checked}
                        onChange={handleChecked}
                    />
                    <Checkbox
                        label="Thai"
                        value={checked}
                        onChange={handleChecked}
                    />
                    <Checkbox
                        label="Vietnamese"
                        value={checked}
                        onChange={handleChecked}
                    /> */}
                    <button>Submit Categories</button>
                </form>
                <p>This is checkedState: {checkedState}</p>
                <p>This is type of checkedState: typeof(checkedState)</p>
            </div>
        </>
    );
}

export default CategorySelect;