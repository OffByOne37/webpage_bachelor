import React from "react";
import "../../css/App.css"

const HelpInformation = ({ help }) => {
    return (
        <span className="Help"
            title={help}
        >
            &#9432;
        </span>
    )
}

export default HelpInformation;