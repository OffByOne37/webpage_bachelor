import React from "react";
import { EditorField } from "../NumberParameterBlock";
import RangeEditor from "./RangeEditor";
import ColorEditor from "./ColorEditor";
import NoteEditor from "./NoteEditor";
import IntegerEditor from "./IntegerEditor";
import ProtractorEditor from "./ProtractorEditor";
import SpeedEditor from "./SpeedEditor";
import TimeEditor from "./TimeEditor";



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
        default:
            console.log("Default case");
            return null;
    }
};


export default SpecificEditor;
