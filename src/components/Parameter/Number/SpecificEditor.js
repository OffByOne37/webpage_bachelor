import React from "react";
import { EditorField } from "./NumberParameterBlock";
import RangeEditor from "./Editors/specific_editors/RangeEditor";
import ColorEditor from "./Editors/specific_editors/ColorEditor";
import NoteEditor from "./Editors/specific_editors/NoteEditor";
import IntegerEditor from "./Editors/specific_editors/IntegerEditor";
import ProtractorEditor from "./Editors/specific_editors/ProtractorEditor";
import SpeedEditor from "./Editors/specific_editors/SpeedEditor";
import TimeEditor from "./Editors/specific_editors/TimeEditor";
import TurnRatioEditor from "./Editors/specific_editors/TurnRatioEditor";



const SpecificEditor = ({ parameter, editorField, handlePropertyChange }) => {
    switch (editorField) {
        case EditorField.Range:
            return (
                <RangeEditor parameter={parameter} handlePropertyChange={handlePropertyChange} />
            );
        case EditorField.Color:
            return (
                <ColorEditor parameter={parameter} handlePropertyChange={handlePropertyChange} />
            );
        case EditorField.Note:
            return (
                <NoteEditor parameter={parameter} handlePropertyChange={handlePropertyChange} />
            );
        case EditorField.Int:
            return (
                <IntegerEditor parameter={parameter} handlePropertyChange={handlePropertyChange} />
            );
        case EditorField.Protractor:
            return (
                <ProtractorEditor parameter={parameter} handlePropertyChange={handlePropertyChange} />
            );
        case EditorField.Speed:
            return (
                <SpeedEditor parameter={parameter} handlePropertyChange={handlePropertyChange}/>
            )
        case EditorField.Time:
            return(
                <TimeEditor parameter={parameter} handlePropertyChange={handlePropertyChange}/> 
            )
        case EditorField.TurnRatio:
            return(
                <TurnRatioEditor parameter={parameter} handlePropertyChange={handlePropertyChange}/>
            )
        default:
            console.log("Default case");
            return null;
    }
};


export default SpecificEditor;
