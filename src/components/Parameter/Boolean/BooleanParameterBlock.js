import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import "../Parameter.css"
import "../PictureEditor.css"
import toggleDownUp from "./boolean_editor_pictures/toggleDownUp.png"
import toggleUpDown from "./boolean_editor_pictures/toggleUpDown.png"
import toggleHighLow from "./boolean_editor_pictures/toggleHighLow.png"
import toggleOnOff from "./boolean_editor_pictures/toggleOnOff.png"
import toggleYesNo from "./boolean_editor_pictures/toggleYesNo.png"


const BooleanParameterBlock = ({ parameter, handlePropertyChangeBoolean }) => {
    const [expanded, setExpanded] = useState(false);

    useEffect(()=>{
        handlePropertyChangeBoolean("toggleDownUp", parameter.name, "shadow");
    }, [])

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

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
            {expanded &&
                <div className="picture-editor-container">
                    <button
                        onClick={() => handlePropertyChangeBoolean("toggleDownUp", parameter.name, "shadow")}
                        className="picture-editor-button"
                        style={{ border: parameter.shadow === "toggleDownUp" ? "2px solid blue" : "", }}>
                        <p>Toggle Down Up</p>
                        <img
                            src={toggleDownUp}
                            alt="toggle down up"
                            className='button-img'
                        />
                    </button>
                    <button
                        onClick={() => handlePropertyChangeBoolean("toggleUpDown", parameter.name, "shadow")}
                        className="picture-editor-button"
                        style={{ border: parameter.shadow === "toggleUpDown" ? "2px solid blue" : "", }}>
                        <p>Toggle Up Down</p>
                        <img
                            src={toggleUpDown}
                            alt="toggleUpDown"
                            className='button-img'
                        />
                    </button>
                    <button
                        onClick={() => handlePropertyChangeBoolean("toggleHighLow", parameter.name, "shadow")}
                        className="picture-editor-button"
                        style={{ border: parameter.shadow === "toggleHighLow" ? "2px solid blue" : "", }}>
                        <p>Toggle High Low</p>
                        <img
                            src={toggleHighLow}
                            alt="toggleHighLow"
                            className='button-img'
                        />
                    </button>
                    <button
                        onClick={() => handlePropertyChangeBoolean("toggleOnOff", parameter.name, "shadow")}
                        className="picture-editor-button"
                        style={{ border: parameter.shadow === "toggleOnOff" ? "2px solid blue" : "", }}>
                        <p>Toggle On Off</p>
                        <img
                            src={toggleOnOff}
                            alt="toggleOnOff"
                            className='button-img'
                        />
                    </button>
                    <button
                        onClick={() => handlePropertyChangeBoolean("toggleYesNo", parameter.name, "shadow")}
                        className="picture-editor-button"
                        style={{ border: parameter.shadow === "toggleYesNo" ? "2px solid blue" : "", }}>
                        <p>Toggle Yes No</p>
                        <img
                            src={toggleYesNo}
                            alt="Toggle Yes No"
                            className='button-img'
                        />
                    </button>
                    <div>
                        <input
                            type="checkbox"
                            onChange={e => handlePropertyChangeBoolean(e.target.checked, parameter.name, "def")} /> Default value "false"?
                        <div />
                    </div>
                </div>

            }



        </div>

    )
}

export default BooleanParameterBlock;