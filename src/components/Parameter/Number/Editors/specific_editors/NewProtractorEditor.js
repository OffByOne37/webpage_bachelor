import React, { useEffect} from "react";
import GetDefaultValue from "./helper/GetDefaultValue";
import NewGetDefaultValue from "./helper/NewGetDefaultValue";

const NewProtractorEditor = ({ parameter, handlePropertyChange }) => {

    // Call the handlePropertyChange function when the component is rendered for the first time
    useEffect(() => {
        handlePropertyChange("protractorPicker", parameter, "shadow");
    }, []);



    return (
        <NewGetDefaultValue parameter={parameter} handlePropertyChange={handlePropertyChange} onlyNumber={true}/>
    );
};

export default NewProtractorEditor;
