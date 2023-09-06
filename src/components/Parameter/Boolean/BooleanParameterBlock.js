import React from 'react';
import "../Parameter.css";
import ParameterBlock from '../ParameterBlock';
import "../PictureEditor.css";
import { PossibleBoolEditors } from './PossibleBoolEditors';

const BooleanParameterBlock = ({ parameter, handlePropertyChangeBoolean }) => {

    const boolEditorOptions = [
        {
            text: "Use toggle switch",
            editor: PossibleBoolEditors.Toggle
        },
        {
            text: "Use variable as input",
            editor: PossibleBoolEditors.Variable
        }
    ]


    return (
        <ParameterBlock parameter={parameter} handlePropertyChange={handlePropertyChangeBoolean} startEditor={PossibleBoolEditors.None} options={boolEditorOptions}/>
    )
}
export default BooleanParameterBlock;