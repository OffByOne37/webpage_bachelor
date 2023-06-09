import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { faUndo } from '@fortawesome/free-solid-svg-icons';
import SingleNumberCheckbox from './SingleNumberCheckbox';
import SpecificEditor from './Editors/SpecificEditor';

const EditorField = {
    None: "None",
    TurnRatio: "TurnRatio",
    Speed: "Speed",
    Protractor: "Protractor",
    Note: "Note",
    Time: "Time",
    Color: "Color",
    Range: "Range",
    Int: "Integer"
};

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
        }
    ]
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const handleEditorFieldChange = (e, newEditorField) => {
        setEditorField(e.target.checked ? newEditorField : EditorField.None);
    };
    return (
        <div style={{ width: "100%", border: "solid 1px", marginBlockEnd: "2px", display: "flex", flexDirection: "column" }}>
            <div>
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
                                    onClick={(e) => handleEditorFieldChange(e, EditorField.None)}
                                    style={{ marginLeft: '5px' }}
                                >
                                    <FontAwesomeIcon icon={faUndo} />
                                </button>
                                <SpecificEditor parameter={parameter} editorField={editorField} handlePropertyChange={handlePropertyChange}/>
                            </div>
                        )}
                        {/* Show all possible Options */}
                        {editorField === EditorField.None && (
                            options.map((option) => (
                                <SingleNumberCheckbox
                                    key={option.text}
                                    text={option.text}
                                    currEditorField={editorField}
                                    editorField={option.editorField}
                                    handleEditorFieldChange={handleEditorFieldChange}
                                    help={option.help !== undefined ? option.help : null}
                                />
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export { EditorField };
export default NumberParameterBlock;
