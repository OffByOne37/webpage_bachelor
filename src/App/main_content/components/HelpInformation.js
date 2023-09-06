import React from "react";

const HelpInformation = ({ help }) => {
    return (
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
    )
}

export default HelpInformation;