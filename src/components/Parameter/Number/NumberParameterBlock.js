import React from 'react';
import '../../Parameter/Parameter.css';
import { EditorField } from './EditorField';
import ParameterBlock from '../ParameterBlock';


const NumberParameterBlock = ({ parameter, handlePropertyChange }) => {

    const numberEditorOptions = [
        {
            text: "Simple Integer",
            editor: EditorField.Int
        }, {
            text: "TurnRatio",
            editor: EditorField.TurnRatio,
            help: "Something like steer X degrees to the right."
        }, {
            text: "Range",
            editor: EditorField.Range
        }, {
            text: "Speed",
            editor: EditorField.Speed
        }, {
            text: "Protractor",
            editor: EditorField.Protractor
        }, {
            text: "Note",
            editor: EditorField.Note,
            help: "Will play a sound at x Hz. A little piano will be displayed."
        }, {
            text: "Time",
            editor: EditorField.Time
        }, {
            text: "Color",
            editor: EditorField.Color
        },{
            text: "Use Variable Input",
            editor: EditorField.Variable
        }
    ]

    return (
        <ParameterBlock parameter={parameter} handlePropertyChange={handlePropertyChange} startEditor={EditorField.None} options={numberEditorOptions}/>
    );
};

export default NumberParameterBlock;
