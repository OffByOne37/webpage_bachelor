import React, { useEffect } from "react";
import NewGetDefaultValue from "./helper/NewGetDefaultValue";


const NewVariableEditor = ({ parameter, handlePropertyChange }) => {

    useEffect(()=>
    {
        handlePropertyChange("variables_get", parameter, "shadow");
    },[])

    return (
        <NewGetDefaultValue parameter={parameter} handlePropertyChange={handlePropertyChange} onlyNumber={false}/>

    )
}

export default NewVariableEditor;