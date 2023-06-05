import React, { useState } from "react";

const OptionPane = ({ generateFunction }) => {
    const [blockIDRequired, setBlockIDRequired] = useState(false);
    const [blockID, setBlockID] = useState("");
    const [inline, setInline] = useState(false);
    const [advanced, setAdvanced] = useState(false);

    const handleBlockIDChange = (event) => {
        setBlockID(event.target.value);
    };

    const handleGenerateClick = () => {
        if (blockIDRequired && blockID === "") {
            alert("Please enter a BlockID");
            return;
        }

        generateFunction(blockID, inline, advanced);
    };

    return (
        <div style={{ display: "flex", width: "100%", alignSelf: "flex-start", flexDirection: "column", alignItems: "flex-start", justifyContent: "center", position: "absolute", top: "0", left: "0" }}>
            <h5>Options for your function</h5>
            <label style={{ color: blockIDRequired ? "black" : "grey" }}>
                <input
                    type="checkbox"
                    checked={blockIDRequired}
                    style={{marginRight:"4px"}}
                    onChange={() => setBlockIDRequired(!blockIDRequired)}
                />
                BlockID
            </label>
            {blockIDRequired && (
                <input
                    type="text"
                    value={blockID}
                    onChange={handleBlockIDChange}
                    required={blockIDRequired}
                />
            )}
            <label style={{ color: inline ? "black" : "grey" }}>
                <input
                    type="checkbox"
                    checked={inline}
                    onChange={() => setInline(!inline)}
                    style={{marginRight:"4px"}}
                />
                Inline
                <span
                    style={{
                        display: "inline-block",
                        marginLeft: "4px",
                        cursor: "help",
                        textDecoration: "underline",
                    }}
                    title="This causes the block parameters to wrap across multiple lines instead of staying inline."
                >
                    &#9432;
                </span>
            </label>
            <label style={{ color: advanced ? "black" : "grey" }}>
                <input
                    type="checkbox"
                    checked={advanced}
                    onChange={() => setAdvanced(!advanced)}
                    style={{marginRight:"4px"}}
                />
                Advanced
                <span
                    style={{
                        display: "inline-block",
                        marginLeft: "4px",
                        cursor: "help",
                        textDecoration: "underline",
                    }}
                    title="This causes the block to be placed under the parent category's &quot;More...&quot; subcategory. This is especially helpful for functions that are rarely used or more advanced, so they should not be visible always!"
                >
                    &#9432;
                </span>
            </label>
            <button onClick={handleGenerateClick}>Generate</button>
        </div>
    );
};

export default OptionPane;
