import React, { useEffect } from "react";
import GetDefaultValue from "./helper/GetDefaultValue";


const NoteEditor = ({ parameter, handlePropertyChange }) => {

    // Call the handlePropertyChange function when the component is rendered for the first time
    useEffect(() => {
        handlePropertyChange("note", parameter.name, "editorField");
    }, []);

    return (
        <GetDefaultValue parameter={parameter} handlePropertyChange={handlePropertyChange} onlyNumber={true}/>
    );
};

export default NoteEditor;
