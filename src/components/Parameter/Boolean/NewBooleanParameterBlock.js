import React from 'react';
import NewParameterBlock from '../NewParameterBlock';
import "../Parameter.css";
import "../PictureEditor.css";
import { PossibleBoolEditors } from './PossibleBoolEditors';

const NewBooleanParameterBlock = ({ parameter, handlePropertyChangeBoolean }) => {

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
        <NewParameterBlock parameter={parameter} handlePropertyChange={handlePropertyChangeBoolean} startEditor={PossibleBoolEditors.None} options={boolEditorOptions}/>
    )
}
export default NewBooleanParameterBlock;