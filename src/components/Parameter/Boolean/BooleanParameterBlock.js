import React, { useEffect, useState } from 'react';
import "../Parameter.css"
import "../PictureEditor.css"
import { PossibleBoolEditors } from './PossibleBoolEditors';
import ParameterBlock from '../ParameterBlock';

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