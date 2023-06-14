import React from "react";
import VariableEditor from "../Number/Editors/specific_editors/VariableEditor";
import ToggleEditor from "./specific_editor/ToggleEditor";
import { PossibleBoolEditors } from "./PossibleBoolEditors";


const SpecificBooleanEditor = ({ parameter, boolEditor, handlePropertyChangeBoolean }) => {
    switch (boolEditor) {
        case PossibleBoolEditors.Toggle:
            return (
                <ToggleEditor parameter={parameter} handlePropertyChangeBoolean={handlePropertyChangeBoolean} />
            );
        case PossibleBoolEditors.Variable:
            return (
                <VariableEditor parameter={parameter} handlePropertyChange={handlePropertyChangeBoolean}/>
            );
        default:
            console.log("Default case");
            return null;
    }
};


export default SpecificBooleanEditor;
