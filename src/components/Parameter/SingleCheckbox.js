import React from "react";
import HelpInformation from "./HelpInformation";

const SingleCheckbox = ({ text, newOption, setNewOption, help }) => {
    return (
        <div>
            <input
                type="checkbox"
                style={{ marginRight: "4px" }}
                onClick={(e) => setNewOption(newOption)}
            />
            {text}
            {typeof help !== 'undefined' && help !== null &&
                <HelpInformation help={help}/>
            }
        </div>
    );
};

export default SingleCheckbox;
