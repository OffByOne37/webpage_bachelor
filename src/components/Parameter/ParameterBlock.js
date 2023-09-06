import { faAngleDown, faAngleUp, faUndo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import './Parameter.css';
import SingleCheckbox from './SingleCheckbox';
import SpecificEditor from './SpecificEditor';


const ParameterBlock = ({ parameter, handlePropertyChange, startEditor, options }) => {
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
        handlePropertyChange(undefined, parameter.name, "editorField");
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
                    {editorField !== startEditor && (
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

export default ParameterBlock;
