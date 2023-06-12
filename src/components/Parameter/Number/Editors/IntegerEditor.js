import React from "react";
const handleInput = (inp) => {
    const inputValue = inp.trim();
    const isValidInput = /^[-0-9]+$/.test(inputValue);
    return isValidInput ? parseInt(inputValue) : undefined;
};

const IntegerEditor = ({ parameter, handlePropertyChange }) => {
    return (
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignContent: "flex-start" }}>
            <label style={{ marginRight: "4px" }}>default Value:</label>
            <input
                type="text"
                style={{ width: "30%" }}
                defaultValue={parameter.def === undefined ? "" : parameter.def}
                onBlur={(e) => handlePropertyChange(handleInput(e.target.value), parameter.name, "def")}
            />
        </div>
    )
}

export default IntegerEditor;