import { faAngleDown, faAngleUp, faUndo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import NewSpecificEditor from './NewSpecificEditor';
import './css/Parameter.css';
import SingleCheckbox from './SingleCheckbox';


const NewParameterBlock = ({ parameter, handlePropertyChange, startEditor, options }) => {
    const [expanded, setExpanded] = useState(false);
    const [editorField, setEditorField] = useState(startEditor);
   

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleResetClick = () => {
        resetValues();
        setEditorField(startEditor);
    }


    const resetValues = () => {
        handlePropertyChange(undefined, parameter, "editorField");
        handlePropertyChange(undefined, parameter, "shadow");
        handlePropertyChange(undefined, parameter, "def");
        handlePropertyChange(undefined, parameter, "max");
        handlePropertyChange(undefined, parameter, "min");
    }
    return (
        <div className='parameter_container'>
            <div >
                <h7>Parameter <strong>{parameter}</strong>:</h7>
                <FontAwesomeIcon
                    icon={expanded ? faAngleUp : faAngleDown}
                    style={{ marginLeft: "4px" }}
                    onClick={handleExpandClick}
                />
            </div>
            {expanded && (
                <div>
                    {/* Only show chosen option and correct Editor */}
                    {editorField !== startEditor && (
                        <div>
                            {'Parameter '}<strong>{parameter}</strong>{' represents: '}
                            {editorField}
                            <button
                                type='button'
                                onClick={(e) => handleResetClick()}
                                style={{ marginLeft: '5px' }}
                            >
                                <FontAwesomeIcon icon={faUndo} />
                            </button>
                            <NewSpecificEditor parameter={parameter} editorField={editorField} handlePropertyChange={handlePropertyChange} />
                        </div>
                    )}
                    {/* Show all possible Options */}
                    {editorField === startEditor && (
                        options.map((option) => (
                            <SingleCheckbox
                                key={option.text}
                                text={option.text}
                                newOption={option.editor}
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

export default NewParameterBlock;
