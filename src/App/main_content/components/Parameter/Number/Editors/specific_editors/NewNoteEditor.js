import React, { useEffect } from "react";
import NewGetDefaultValue from "./helper/NewGetDefaultValue";


const NewNoteEditor = ({ parameter, handlePropertyChange }) => {

    // Call the handlePropertyChange function when the component is rendered for the first time
    useEffect(() => {
        handlePropertyChange("note", parameter, "editorField");
    }, []);

    return (
        <NewGetDefaultValue parameter={parameter} handlePropertyChange={handlePropertyChange} onlyNumber={true}/>
    );
};

export default NewNoteEditor;
