import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import "../Parameter.css"
import "../PictureEditor.css"
import { faUndo } from '@fortawesome/free-solid-svg-icons';
import SpecificBooleanEditor from './SpecificBooleanEditor';
import { PossibleBoolEditors } from './PossibleBoolEditors';
import SingleCheckbox from '../SingleCheckbox';

const BooleanParameterBlock = ({ parameter, handlePropertyChangeBoolean }) => {
    const [expanded, setExpanded] = useState(false);
    const [currBoolEditor, setCurrBoolEditor] = useState(PossibleBoolEditors.None);

    const currBoolEditors = [
        {
            text: "Use toggle switch",
            boolEditor: PossibleBoolEditors.Toggle
        },
        {
            text: "Use variable as input",
            boolEditor: PossibleBoolEditors.Variable
        }
    ]


    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleResetClick = () => {
        handlePropertyChangeBoolean(undefined, parameter.name, "shadow");
        handlePropertyChangeBoolean(undefined, parameter.name, "def")
        setCurrBoolEditor(PossibleBoolEditors.None);
    }


    return (

        <div className="parameter_container">
            <div >
                <h7>Parameter <strong>{parameter.name}</strong>:</h7>
                <FontAwesomeIcon
                    icon={expanded ? faAngleUp : faAngleDown}
                    style={{ marginLeft: "4px" }}
                    onClick={handleExpandClick}
                />
            </div>
            {
                expanded && (
                    <div>
                        {/* Only show chosen currBoolEditor and correct Editor */}
                        {currBoolEditor !== PossibleBoolEditors.None && (
                            <div>
                                {'Parameter '}<strong>{parameter.name}</strong>{' should have: '}
                                {currBoolEditor}
                                <button
                                    type='button'
                                    onClick={handleResetClick}
                                    style={{ marginLeft: '5px' }}
                                >
                                    <FontAwesomeIcon icon={faUndo} />
                                </button>
                                <SpecificBooleanEditor parameter={parameter} boolEditor={currBoolEditor} handlePropertyChangeBoolean={handlePropertyChangeBoolean} />
                            </div>
                        )}
                        {/* Show all possible currBoolEditors */}
                        {currBoolEditor === PossibleBoolEditors.None && (
                            currBoolEditors.map((possibleBoolEditor) => (
                                <SingleCheckbox
                                    key={possibleBoolEditor.text}
                                    text={possibleBoolEditor.text}
                                    newOption={possibleBoolEditor.boolEditor}
                                    setNewOption={setCurrBoolEditor}
                                    help={possibleBoolEditor.help}
                                />
                            ))
                        )}
                    </div>

                )
            }


        </div>

    )
}
export {PossibleBoolEditors};
export default BooleanParameterBlock;