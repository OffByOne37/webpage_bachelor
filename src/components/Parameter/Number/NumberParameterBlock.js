import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { faUndo } from '@fortawesome/free-solid-svg-icons';
import SpecificEditor from './SpecificEditor';
import '../../Parameter/Parameter.css';
import { EditorField } from './EditorField';
import SingleCheckbox from '../SingleCheckbox';


const NumberParameterBlock = ({ parameter, handlePropertyChange }) => {
    const [expanded, setExpanded] = useState(false);
    const [editorField, setEditorField] = useState(EditorField.None);
    const options = [
        {
            text: "Simple Integer",
            editorField: EditorField.Int
        }, {
            text: "TurnRatio",
            editorField: EditorField.TurnRatio,
            help: "Something like steer X degrees to the right."
        }, {
            text: "Range",
            editorField: EditorField.Range
        }, {
            text: "Speed",
            editorField: EditorField.Speed
        }, {
            text: "Protractor",
            editorField: EditorField.Protractor
        }, {
            text: "Note",
            editorField: EditorField.Note,
            help: "Will play a sound at x Hz. A little piano will be displayed."
        }, {
            text: "Time",
            editorField: EditorField.Time
        }, {
            text: "Color",
            editorField: EditorField.Color
        },{
            text: "Use Variable Input",
            editorField: EditorField.Variable
        }
    ]

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleResetClick = () => {
        resetValues();
        setEditorField(EditorField.None);
    }


    const resetValues = () => {
        handlePropertyChange(EditorField.None, parameter.name, "editorField");
        handlePropertyChange(undefined, parameter.name, "shadow");
        handlePropertyChange(undefined, parameter.name, "def");
        handlePropertyChange(undefined, parameter.name, "max");
        handlePropertyChange(undefined, parameter.name, "min");
    }
    return (
        <div className='parameter_container'>
            <div >
                <h7>Parameter <strong>{parameter.name}</strong>:</h7>
                <FontAwesomeIcon
                    icon={expanded ? faAngleUp : faAngleDown}
                    style={{ marginLeft: "4px" }}
                    onClick={handleExpandClick}
                />
            </div>
            {expanded && (
                <div>
                    {/* Only show chosen option and correct Editor */}
                    {editorField !== EditorField.None && (
                        <div>
                            {'Parameter '}<strong>{parameter.name}</strong>{' represents: '}
                            {editorField}
                            <button
                                type='button'
                                onClick={(e) => handleResetClick()}
                                style={{ marginLeft: '5px' }}
                            >
                                <FontAwesomeIcon icon={faUndo} />
                            </button>
                            <SpecificEditor parameter={parameter} editorField={editorField} handlePropertyChange={handlePropertyChange} />
                        </div>
                    )}
                    {/* Show all possible Options */}
                    {editorField === EditorField.None && (
                        options.map((option) => (
                            <SingleCheckbox
                                key={option.text}
                                text={option.text}
                                newOption={option.editorField}
                                setNewOption={setEditorField}
                                help={option.help}
                            />
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default NumberParameterBlock;
