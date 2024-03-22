import { useState } from "react";

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
                    <label htmlFor="">
                        Restaurant Category Choices:
                        <input
                            type="checkbox"
                            onChange={handleChecked}
                            required
                        />
                            Type of Restaurant
                    </label>
                    <p>Data type of "checked"? {typeof(checked)}</p>
                    <p>Is "Type of Restaurant" checked? {checked.toString()}</p>
                    <button>Submit Categories</button>
                </form>
            </div>
        </>
    );
}

export default CategorySelect;