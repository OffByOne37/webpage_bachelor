import React, { useEffect, useState } from "react";
import toggleDownUp from "../boolean_editor_pictures/toggleDownUp.png";
import toggleHighLow from "../boolean_editor_pictures/toggleHighLow.png";
import toggleOnOff from "../boolean_editor_pictures/toggleOnOff.png";
import toggleUpDown from "../boolean_editor_pictures/toggleUpDown.png";
import toggleYesNo from "../boolean_editor_pictures/toggleYesNo.png";

const toggleOptions = [
    { value: "toggleDownUp", label: "Toggle Down Up", image: toggleDownUp },
    { value: "toggleUpDown", label: "Toggle Up Down", image: toggleUpDown },
    { value: "toggleHighLow", label: "Toggle High Low", image: toggleHighLow },
    { value: "toggleOnOff", label: "Toggle On Off", image: toggleOnOff },
    { value: "toggleYesNo", label: "Toggle Yes No", image: toggleYesNo },
];

const NewToggleEditor = ({ parameter, handlePropertyChange }) => {
    const [currShadow, setCurrShadow] = useState("toogleDownUp");

    useEffect(() => {
        handlePropertyChange("toggleDownUp", parameter, "shadow");
    }, [])


    function handleButtonClick(newValue){
        setCurrShadow(newValue);
        handlePropertyChange(newValue, parameter, "shadow");
    }


    return (
        <div className="picture-editor-container">
            {toggleOptions.map((option) => (
                <button
                    key={option.value}
                    onClick={() => handleButtonClick(option.value)}
                    className="picture-editor-button"
                    style={{ border: currShadow === option.value ? "2px solid blue" : "" }}
                >
                    <p>{option.label}</p>
                    <img src={option.image} alt={option.label} className="button-img" />
                </button>
            ))}
            <div>
                <input
                    type="checkbox"
                    onChange={(e) => handlePropertyChange(!e.target.checked, parameter, "def")}
                />{" "}
                Default value "false"?
            </div>
        </div>
    );
};

export default NewToggleEditor;
