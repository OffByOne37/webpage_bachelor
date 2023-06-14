import React from "react";
import GetDefaultValue from "./helper/GetDefaultValue";

const IntegerEditor = ({ parameter, handlePropertyChange }) => {
    return (
        <GetDefaultValue parameter={parameter} handlePropertyChange={handlePropertyChange} onlyNumber={true}/>
    )
}

export default IntegerEditor;