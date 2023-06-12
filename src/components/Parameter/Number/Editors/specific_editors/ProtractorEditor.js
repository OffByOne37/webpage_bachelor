import React, { useEffect} from "react";
import { handleInput } from "../inputHandler";

const ProtractorEditor = ({ parameter, handlePropertyChange }) => {

    // Call the handlePropertyChange function when the component is rendered for the first time
    useEffect(() => {
        handlePropertyChange("protractorPicker", parameter.name, "shadow");
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

    );
};

export default ProtractorEditor;
