import { useState } from "react";
import Checkbox from "../components/Checkbox";

function CategorySelect() {
    const [american, setAmerican] = useState(false);
    const [bbq, setBbq] = useState(false);
    const [chinese, setChinese] = useState(false);
    const [fastFood, setFastFood] = useState(false);

    const handleAmerican = (e) => {
        setAmerican(e.target.checked);
        console.log(e.target.checked, e.target.name);
    };

    const handleBbq = (e) => {
        setBbq(e.target.checked);
        console.log(e.target.checked, e.target.name);
    };

    const handleChinese = (e) => {
        setChinese(e.target.checked);
        console.log(e.target.checked, e.target.name);
    };

    const handleFastFood = (e) => {
        setFastFood(e.target.checked);
        console.log(e.target.checked, e.target.name);
    };

    return (
        <>
            <div>
            <h1>Choose restaurant categories:</h1>
                <form className="categories-form">
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
                    </label> */}
                    {/* <label htmlFor="">
                        <input
                            type="checkbox"
                            name="bbq"
                            checked={checked}
                            onChange={handleChecked}
                            required
                        />
                            BBQ
                    </label> */}
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
                    {/* <Checkbox
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
            </div>
        </>
    );
}

export default CategorySelect;