import React, { useEffect } from "react";
import { handleInput } from "./inputHandler";

const TimeEditor = ({ parameter, handlePropertyChange }) => {

    // Call the handlePropertyChange function when the component is rendered for the first time
    useEffect(() => {
        handlePropertyChange("speedPicker", parameter.name, "editorField");
    }, []);

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

export default TimeEditor;