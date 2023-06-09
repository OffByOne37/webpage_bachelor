import React from "react";
import { EditorField } from "../NumberParameterBlock";
import SimpleIntegerEditor from "./SimpleIntegerEditor";



const SpecificEditor = ({ parameter, editorField, handlePropertyChange }) => {
    switch (editorField) {
        case EditorField.Int:
            return (
            <SimpleIntegerEditor parameter={parameter} handlePropertyChange={handlePropertyChange}/>
            );
        default:
            console.log("Default case");
            return null;
    }
};


export default SpecificEditor;
