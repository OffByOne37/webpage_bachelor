import React from "react";
import { handleInput } from "./helper/inputHandler";


const NewRangeEditor = ({ parameter, handlePropertyChange }) => {
    return (
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignContent: "space-between" }}>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
                <label style={{ marginRight: "4px" }}>min Value:</label>
                <input
                    id={`min-input-${parameter}`}
                    type="text"
                    style={{ width: "30%" }}
                    onBlur={(e) => handlePropertyChange(handleInput(e.target.value), parameter, "min")}
                />
            </div>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
                <label style={{ marginRight: "4px" }}>max Value:</label>
                <input
                    type="text"
                    style={{ width: "30%" }}
                    defaultValue={parameter.max === undefined ? "" : parameter.max}
                    onBlur={(e) => handlePropertyChange(handleInput(e.target.value), parameter, "max")}
                />
            </div>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
                <label style={{ marginRight: "4px" }}>default Value:</label>
                <input
                    type="text"
                    style={{ width: "30%" }}
                    defaultValue={parameter.def === undefined ? "" : parameter.def}
                    onBlur={(e) => handlePropertyChange(handleInput(e.target.value), parameter, "def")}
                />
            </div>
        </div>
    )
}

export default NewRangeEditor;