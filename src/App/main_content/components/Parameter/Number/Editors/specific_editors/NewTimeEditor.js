import React, { useEffect } from "react";
import NewGetDefaultValue from "./helper/NewGetDefaultValue";

const NewTimeEditor = ({ parameter, handlePropertyChange }) => {

    // Call the handlePropertyChange function when the component is rendered for the first time
    useEffect(() => {
        handlePropertyChange("timePicker", parameter, "shadow");
    }, []);

    return (
        <NewGetDefaultValue parameter={parameter} handlePropertyChange={handlePropertyChange} onlyNumber={true}/>
    )
}

export default NewTimeEditor;