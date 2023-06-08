import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { faUndo } from '@fortawesome/free-solid-svg-icons';
import SingleNumberCheckbox from './SingleNumberCheckbox';


const handleInput = (inp) => {
    const inputValue = inp.trim();
    const isValidInput = /^[-0-9]+$/.test(inputValue);
    return isValidInput ? parseInt(inputValue) : "undefined";
};

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
                            </div>
                        )}




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




                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignContent: "space-between" }}>
                    <div style={{ display: "flex", justifyContent: "space-around" }}>
                        <label style={{ marginRight: "4px" }}>min Value:</label>
                        <input
                            id={`min-input-${parameter.name}`}
                            type="text"
                            style={{ width: "30%" }}
                            onBlur={(e) => handlePropertyChange(handleInput(e.target.value), parameter.name, "min")}
                        />
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-around" }}>
                        <label style={{ marginRight: "4px" }}>max Value:</label>
                        <input
                            type="text"
                            style={{ width: "30%" }}
                            defaultValue={parameter.max === "undefined" ? "" : parameter.max}
                            onBlur={(e) => handlePropertyChange(handleInput(e.target.value), parameter.name, "max")}
                        />
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-around" }}>
                        <label style={{ marginRight: "4px" }}>default Value:</label>
                        <input
                            type="text"
                            style={{ width: "30%" }}
                            defaultValue={parameter.def === "undefined" ? "" : parameter.def}
                            onBlur={(e) => handlePropertyChange(handleInput(e.target.value), parameter.name, "def")}
                        />
                    </div>
                </div>
                    
                
            </div>

        </div>
    );
};

export default NumberParameterBlock;
