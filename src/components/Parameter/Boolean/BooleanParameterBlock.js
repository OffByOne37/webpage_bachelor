import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import "../Parameter.css"
import "../PictureEditor.css"
import { faUndo } from '@fortawesome/free-solid-svg-icons';
import SingleNumberCheckbox from '../Number/SingleNumberCheckbox';
import ToggleEditor from './specific_editor/ToggleEditor';
import SpecificBooleanEditor from './SpecificBooleanEditor';
import SingleBooleanCheckbox from './SingleBooleanCheckbox';


const PossibleOptions = {
    None: undefined,
    Toggle: "Toggle",
    Variable: "Variable"
}

const BooleanParameterBlock = ({ parameter, handlePropertyChangeBoolean }) => {
    const [expanded, setExpanded] = useState(false);
    const [option, setOption] = useState(PossibleOptions.None);

    const options = [
        {
            text: "Use toggle switch",
            option: PossibleOptions.Toggle
        },
        {
            text: "Use variable as input",
            option: PossibleOptions.Variable
        }
    ]

    useEffect(() => {
        handlePropertyChangeBoolean("toggleDownUp", parameter.name, "shadow");
    }, [])

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleResetClick = () => {
        handlePropertyChangeBoolean(undefined, parameter.name, "shadow");
        handlePropertyChangeBoolean(undefined, parameter.name, "def")
        setOption(PossibleOptions.None);
    }

    const handleOptionChange = (e, newOption) => {
        setOption(newOption);
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
                        {/* Only show chosen option and correct Editor */}
                        {option !== PossibleOptions.None && (
                            <div>
                                {'Parameter '}<strong>{parameter.name}</strong>{' should have: '}
                                {option}
                                <button
                                    type='button'
                                    onClick={(e) => handleResetClick()}
                                    style={{ marginLeft: '5px' }}
                                >
                                    <FontAwesomeIcon icon={faUndo} />
                                </button>
                                <SpecificBooleanEditor parameter={parameter} option={option} handlePropertyChangeBoolean={handlePropertyChangeBoolean} />
                            </div>
                        )}
                        {/* Show all possible Options */}
                        {option === PossibleOptions.None && (
                            options.map((currOption) => (
                                <SingleBooleanCheckbox
                                    key={currOption.text}
                                    text={currOption.text}
                                    currOption={option}
                                    option={currOption.option}
                                    handleOptionChange={handleOptionChange}
                                    help={currOption.help !== undefined ? currOption.help : null}
                                />
                            ))
                        )}
                    </div>

                )
            }


        </div>

    )
}
export {PossibleOptions};
export default BooleanParameterBlock;