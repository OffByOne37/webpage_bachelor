import React, { useEffect } from "react";
import NewGetDefaultValue from "./helper/NewGetDefaultValue";


const NewSpeedEditor = ({ parameter, handlePropertyChange }) => {

    // Call the handlePropertyChange function when the component is rendered for the first time
    useEffect(() => {
        handlePropertyChange("speedPicker", parameter, "shadow");
    }, []);

    return (
        <NewGetDefaultValue parameter={parameter} handlePropertyChange={handlePropertyChange} onlyNumber={true}/>
    )
}

export default NewSpeedEditor;