import React, { useEffect } from "react";
import GetDefaultValue from "./helper/GetDefaultValue";


const VariableEditor = ({ parameter, handlePropertyChange }) => {

    useEffect(()=>
    {
        handlePropertyChange("variables_get", parameter.name, "shadow");
    },[])

    return (
        <GetDefaultValue parameter={parameter} handlePropertyChange={handlePropertyChange} onlyNumber={false}/>

    )
}

export default VariableEditor;