function Checkbox({label, value, onChange}) {
    return ( 
        <label htmlFor="">
            <input
                type="checkbox"
                checked={value}
                onChange={onChange}
                required
            />
                {label}
        </label>
    );
}

export default Checkbox;