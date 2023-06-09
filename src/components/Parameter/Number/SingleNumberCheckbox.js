import React from "react";

const SingleNumberCheckbox = ({ text, currEditorField, editorField, handleEditorFieldChange, help }) => {
    return (
        <div>
            <input
                type="checkbox"
                style={{ marginRight: "4px" }}
                checked={currEditorField === editorField}
                onClick={(e) => handleEditorFieldChange(e, editorField)}
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

export default SingleNumberCheckbox;
