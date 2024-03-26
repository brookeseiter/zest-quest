import { useState } from "react";
import Checkbox from "../components/Checkbox";

function CategorySelect() {
    const [checked, setChecked] = useState(false);

    const handleChecked = () => {
        setChecked(!checked);
    };

    return (
        <>
            <div>
            <h1>Choose restaurant categories:</h1>
                <form className="categories-form">
                    <Checkbox
                        label="Type of Restaurant2"
                        value={checked}
                        onChange={handleChecked}
                    />
                    <p>Data type of "checked"? {typeof(checked)}</p>
                    <p>Is "Type of Restaurant" checked? {checked.toString()}</p>
                    <button>Submit Categories</button>
                </form>
            </div>
        </>
    );
}

export default CategorySelect;