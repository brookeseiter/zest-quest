function Checkbox({label, name, value, onChange}) {
    return ( 
        <label htmlFor="">
            <input
                type="checkbox"
                name={name}
                checked={value}
                onChange={onChange}
                required
            />
                {label}
        </label>
    );
}

export default Checkbox;