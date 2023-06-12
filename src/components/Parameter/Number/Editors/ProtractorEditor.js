import React, { useEffect, useState } from "react";

const handleInput = (inp) => {
    const inputValue = inp.trim();
    const isValidInput = /^[-0-9]+$/.test(inputValue);
    return isValidInput ? parseInt(inputValue) : undefined;
};

const ProtractorEditor = ({ parameter, handlePropertyChange }) => {
    const [color, setColor] = useState('#ff8800');

    // Call the handlePropertyChange function when the component is rendered for the first time
    useEffect(() => {
        handlePropertyChange("protractorPicker", parameter.name, "editorField");
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
