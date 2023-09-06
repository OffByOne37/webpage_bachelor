import React from "react";
import { handleInput } from "./inputHandler";


const NewGetDefaultValue = ({ parameter, handlePropertyChange , onlyNumber}) => {
    return (
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignContent: "flex-start" }}>
            <label style={{ marginRight: "4px" }}>default Value:</label>
            <input
                type="text"
                style={{ width: "30%" }}
                defaultValue={parameter.def === undefined ? "" : parameter.def}
                onBlur={(e) => handlePropertyChange(
                    onlyNumber?handleInput(e.target.value):
                    "\""+(e.target.value)+"\"", parameter, "def")}
            />
        </div>
    )
}

export default NewGetDefaultValue;