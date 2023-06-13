import React, { useEffect } from "react";


const VariableEditor = ({ parameter, handlePropertyChange }) => {

    useEffect(()=>
    {
        handlePropertyChange("variables_get", parameter.name, "shadow");
    },[])

    return (
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignContent: "flex-start" }}>
            <label style={{ marginRight: "4px" }}>default Value:</label>
            <input
                type="text"
                style={{ width: "30%" }}
                defaultValue={parameter.def === undefined ? "" : parameter.def}
                onBlur={(e) => handlePropertyChange("\""+(e.target.value)+"\"", parameter.name, "def")}
            />
        </div>

    )
}

export default VariableEditor;