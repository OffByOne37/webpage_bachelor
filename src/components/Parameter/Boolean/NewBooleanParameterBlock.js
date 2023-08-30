import React, { useEffect, useState } from 'react';
import "../Parameter.css"
import "../PictureEditor.css"
import { PossibleBoolEditors } from './PossibleBoolEditors';
import ParameterBlock from '../ParameterBlock';
import NewParameterBlock from '../NewParameterBlock';

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