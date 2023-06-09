import React from "react";

const handleInput = (inp) => {
    const inputValue = inp.trim();
    const isValidInput = /^[-0-9]+$/.test(inputValue);
    return isValidInput ? parseInt(inputValue) : undefined;
};


const SimpleIntegerEditor = ({ parameter, handlePropertyChange }) => {
    return (
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignContent: "space-between" }}>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
                <label style={{ marginRight: "4px" }}>min Value:</label>
                <input
                    id={`min-input-${parameter.name}`}
                    type="text"
                    style={{ width: "30%" }}
                    onBlur={(e) => handlePropertyChange(handleInput(e.target.value), parameter.name, "min")}
                />
            </div>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
                <label style={{ marginRight: "4px" }}>max Value:</label>
                <input
                    type="text"
                    style={{ width: "30%" }}
                    defaultValue={parameter.max === undefined ? "" : parameter.max}
                    onBlur={(e) => handlePropertyChange(handleInput(e.target.value), parameter.name, "max")}
                />
            </div>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
                <label style={{ marginRight: "4px" }}>default Value:</label>
                <input
                    type="text"
                    style={{ width: "30%" }}
                    defaultValue={parameter.def === undefined ? "" : parameter.def}
                    onBlur={(e) => handlePropertyChange(handleInput(e.target.value), parameter.name, "def")}
                />
            </div>
        </div>
    )
}

export default SimpleIntegerEditor;