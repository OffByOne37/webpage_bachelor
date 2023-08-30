import React from "react";
import GetDefaultValue from "./helper/GetDefaultValue";
import NewGetDefaultValue from "./helper/NewGetDefaultValue";

const NewIntegerEditor = ({ parameter, handlePropertyChange }) => {
    return (
        <NewGetDefaultValue parameter={parameter} handlePropertyChange={handlePropertyChange} onlyNumber={true}/>
    )
}

export default NewIntegerEditor;