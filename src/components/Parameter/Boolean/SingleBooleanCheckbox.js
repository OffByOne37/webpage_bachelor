import React from "react";

const SingleBooleanCheckbox = ({ text, currOption, option, handleOptionChange, help }) => {
    return (
        <div>
            <input
                type="checkbox"
                style={{ marginRight: "4px" }}
                checked={currOption === option}
                onClick={(e) => handleOptionChange(e, option)}
            />
            {text}
            {typeof help !== 'undefined' && help !== null &&
                <span
                    style={{
                        display: "inline-block",
                        marginLeft: "4px",
                        cursor: "help",
                        textDecoration: "underline",
                    }}
                    title={help}
                >
                    &#9432;
                </span>
            }
        </div>
    );
};

export default SingleBooleanCheckbox;
