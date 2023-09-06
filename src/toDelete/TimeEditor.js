import React, { useEffect } from "react";
import GetDefaultValue from "./helper/GetDefaultValue";

const TimeEditor = ({ parameter, handlePropertyChange }) => {

    // Call the handlePropertyChange function when the component is rendered for the first time
    useEffect(() => {
        handlePropertyChange("timePicker", parameter.name, "shadow");
    }, []);

    return (
        <GetDefaultValue parameter={parameter} handlePropertyChange={handlePropertyChange} onlyNumber={true}/>
    )
}

export default TimeEditor;