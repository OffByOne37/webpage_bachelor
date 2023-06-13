import React from "react";
import { PossibleOptions } from "./BooleanParameterBlock"
import VariableEditor from "../Number/Editors/specific_editors/VariableEditor";
import ToggleEditor from "./specific_editor/ToggleEditor";


const SpecificBooleanEditor = ({ parameter, option, handlePropertyChangeBoolean }) => {
    switch (option) {
        case PossibleOptions.Toggle:
            return (
                <ToggleEditor parameter={parameter} handlePropertyChangeBoolean={handlePropertyChangeBoolean} />
            );
        case PossibleOptions.Variable:
            return (
                <VariableEditor parameter={parameter} handlePropertyChange={handlePropertyChangeBoolean}/>
            );
        default:
            console.log("Default case");
            return null;
    }
};


export default SpecificBooleanEditor;
