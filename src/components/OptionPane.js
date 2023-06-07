import React, { useState, useEffect } from "react";
import NumberParameterBlock from "./NumberParameterBlock";

const OptionPane = ({ generateFunction, refreshParameters, currParameters, }) => {
    const [blockIDRequired, setBlockIDRequired] = useState(false);
    const [blockID, setBlockID] = useState("");
    const [inline, setInline] = useState(false);
    const [advanced, setAdvanced] = useState(false);
    const [defaultValue, setDefaultValue] = useState('');
    const [currFunctionName, setCurrFunctionName] = useState(defaultValue);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState(null);
    const [languages, setLanguages] = useState([]);
    const [numberParameter, setNumberParameter] = useState([]);
    const [ownArrayParameter, setOwnArrayParameter] = useState([]);
    const [expandable, setExpandable] = useState("null");

    let mostCommonEuropeanLanguages = ["en", "de", "fr", "es", "it", "pt", "ru", "nl", "pl", "sv"];


    const handleBlockIDChange = (event) => {
        setBlockID(event.target.value);
    };


    useEffect(() => {
        const defaultVal = `function ${currParameters.map(param => `$${param.name}`).join(' ')}`;
        setDefaultValue(defaultVal);
    }, [currParameters]);

    useEffect(() => {
        setCurrFunctionName(defaultValue);
    }, [defaultValue]);

    useEffect(() => {
        setNumberParameter((prevParameters) => {
            const existingNames = new Set(prevParameters.map((param) => param.name));
            const updatedParameters = currParameters
                .filter((x) => x.type === "number" && !existingNames.has(x.name))
                .map((x) => ({
                    name: x.name,
                    min: "undefined",
                    max: "undefined",
                    def: "undefined",
                }));

            return [...prevParameters, ...updatedParameters];
        });
    }, [currParameters]);

    useEffect(() => {
        setOwnArrayParameter((prevArray) => {
            const updatedArray = [...prevArray];

            currParameters.forEach((param) => {
                if (
                    param.type.includes('[]') &&
                    !prevArray.some((item) => item.name === param.name)
                ) {
                    updatedArray.push({ name: param.name, type: param.type, defaultValue: null });
                }
            });

            return updatedArray;
        });
    }, [currParameters]);





    const handleGenerateClick = () => {
        if (blockIDRequired && blockID === "") {
            alert("Please enter a BlockID");
            return;
        }

        if (expandable !== "null" && !(currFunctionName.includes("||"))) {
            alert("You need to enter a \"||\" in your functionName otherwise your function is not expandable!");
            return;
        }

        generateFunction(blockID, inline, advanced, currFunctionName, languages, numberParameter, expandable, ownArrayParameter);
    };

    const handleFunctionNameChange = (e) => {
        setCurrFunctionName(e.target.value);
    }


    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const handleLanguageSelection = (code) => {
        setSelectedLanguage(code);
        togglePopup();
    };


    const handleTextChange = (e, code) => {
        setLanguages((prevLanguages) => {
            const updatedLanguages = prevLanguages.map((lang) => {
                if (lang.code === code) {
                    return { ...lang, text: e.target.value };
                }
                return lang;
            });

            // If the language code is not found, add a new language entry
            if (!updatedLanguages.some((lang) => lang.code === code)) {
                updatedLanguages.push({ code: code, text: e.target.value });
            }

            return updatedLanguages;
        });
    };


    const handleDeleteLanguage = (code) => {
        setLanguages(languages.filter((lang) => lang.code !== code));
    };

    const handleAddLanguage = () => {
        setSelectedLanguage(null);
    };

    const handlePropertyChange = (number, paramName, property) => {
        setNumberParameter((prevParameter) => {
            const updatedParameter = prevParameter.map((x) => {
                if (x.name === paramName) {
                    if (number !== "none") {
                        return { ...x, [property]: number };
                    }
                }
                return x;
            });


            return updatedParameter;
        });
    }

    const handleOwnArrayPropertyChange = (value, name) =>{
        setOwnArrayParameter((prevParameter) => {
            const updatedParameter = prevParameter.map((x) => {
                if (x.name === name) {
                        return { ...x, defaultValue: (value===""?null: value) };
                }
                return x;
            });
            return updatedParameter;
        });
    }

    const handleNumberChange = (checked, numberName) => {
        if (checked) {
            setNumberParameter((prevParameter) => [...prevParameter, { name: [numberName], min: "undefined", max: "undefined", def: "undefined" }]);
        } else {
            setNumberParameter(numberParameter.filter((x) => x.name !== numberName));
        }
    }

    return (
        <div style={{ display: "flex", width: "100%", alignSelf: "flex-start", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", position: "relative", top: "0", left: "0", overflowY: "scroll", height: "100%", maxHeight: "100%" }}>
            <h5>Options for your function</h5>
            <label style={{ color: blockIDRequired ? "black" : "grey" }}>
                <input
                    type="checkbox"
                    checked={blockIDRequired}
                    style={{ marginRight: "4px" }}
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
                    style={{ marginRight: "4px" }}
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
                    style={{ marginRight: "4px" }}
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
            <div>
                {
                    expandable !== "null" && !(currFunctionName.includes("||")) &&
                    <h7 style={{ color: "red" }}>You need to enter "||" in the place where you want your function to expand!</h7>
                }
            </div>

            <div style={{ width: "100%" }}>
                Name of block
                <span
                    style={{
                        display: "inline-block",
                        marginLeft: "1px",
                        cursor: "help",
                        textDecoration: "underline",
                    }}
                    title="Please don't change the parameters, otherwise there will be an error! You need to have all parameters inside this textare with an $ in front"
                >
                    &#9432;
                </span>
                :
                <input
                    type="text"
                    defaultValue={defaultValue}
                    onChange={handleFunctionNameChange}
                    style={{ marginLeft: "4px" }}
                />
                <button onClick={togglePopup}>Add Language</button>

                <div style={{ width: "100%", justifyContent: "left", alignContent: "left", textAlign: "left" }}>
                    {showPopup && (
                        <div>
                            <h7>Select a Language</h7>
                            <ul style={{ display: "flex", flexWrap: "wrap", listStyle: "none", padding: 0 }}>
                                {mostCommonEuropeanLanguages.map((lang) => (
                                    <li key={lang} style={{ marginRight: "6px", marginBottom: "6px" }}>
                                        <button
                                            onClick={() => handleLanguageSelection(lang)}
                                            style={{
                                                padding: "8px 12px",
                                                borderRadius: "4px",
                                                border: "none",
                                                background: "#f0f0f0",
                                                color: "#333",
                                                cursor: "pointer",
                                                transition: "background-color 0.3s",
                                            }}
                                        >
                                            {lang}
                                        </button>
                                    </li>
                                ))}
                            </ul>

                        </div>
                    )}
                </div>

                {selectedLanguage && (
                    <div>
                        <h7>Enter Text for {selectedLanguage}</h7>
                        <label>
                            <input
                                type="text"
                                defaultValue={currFunctionName}
                                onChange={(e) => handleTextChange(e, selectedLanguage)} />
                        </label>
                        <button onClick={handleAddLanguage}>Add</button>
                    </div>
                )}

                <div>
                    <ul style={{ listStyle: "none", padding: 0 }}>
                        {languages.map((lang) => (
                            <li key={lang.code} style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
                                <span style={{ marginRight: "8px" }}>
                                    <strong>{lang.code}:</strong> {lang.text}
                                </span>
                                <button
                                    onClick={() => handleDeleteLanguage(lang.code)}
                                    style={{
                                        padding: "4px 8px",
                                        borderRadius: "4px",
                                        border: "none",
                                        background: "#f0f0f0",
                                        color: "#333",
                                        cursor: "pointer",
                                        transition: "background-color 0.3s",
                                    }}
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
            <button onClick={refreshParameters}>Refresh parameters
                <span
                    style={{
                        display: "inline-block",
                        marginLeft: "4px",
                        cursor: "help",
                        textDecoration: "underline",
                    }}
                    title="This will refresh the parameters of your functions on the left!"
                >
                    &#9432;
                </span>
            </button>
            <div>
                <div>
                    <h7>Should the block be expandable:</h7>
                </div>
                <label>
                    Yes(Toggle)
                    <span
                        style={{
                            display: "inline-block",
                            marginLeft: "4px",
                            cursor: "help",
                            textDecoration: "underline",
                        }}
                        title=" expand all parameters when the the expand icon is selected (clicked)"
                    >
                        &#9432;
                    </span>
                    <input
                        type="checkbox"
                        checked={expandable === "toggle"}
                        onChange={(e) => setExpandable(e.target.checked ? "toggle" : "null")}
                    />
                </label>
                <label>
                    Yes(Enabled)
                    <span
                        style={{
                            display: "inline-block",
                            marginLeft: "4px",
                            cursor: "help",
                            textDecoration: "underline",
                        }}
                        title="expand one parameter at a time for each selection (click) of the expand icon."
                    >
                        &#9432;
                    </span>
                    <input
                        type="checkbox"
                        checked={expandable === "enabled"}
                        onChange={(e) => setExpandable(e.target.checked ? "enabled" : "null")}
                    />
                </label>
            </div>

            <h6>Simple parameters:</h6>
            <h7>Number</h7>
            <div>
                {numberParameter.map(x =>
                    <NumberParameterBlock
                        key={x.name} // Use a unique value as the key to trigger re-render
                        parameter={x}
                        handlePropertyChange={handlePropertyChange}
                    />
                )
                }
            </div>

            <div>
                {currParameters.filter(x => x.type === "undefined").map(x =>
                    <div>
                        Click if parameter "{x.name}" is a number:
                        <input
                            type="checkbox"
                            onChange={(e) => handleNumberChange(e.target.checked, x.name)}
                        />
                    </div>
                )}
            </div>
            <h7>Own Arrays:</h7>
            <div>
                {ownArrayParameter.map(x =>
                    <div>
                        <h7>should <strong>{x.name}</strong> have a default value: </h7>

                        <div style={{ display: "flex", justifyContent: "space-around" }}>
                            <label style={{ marginRight: "4px" }}>min Value:</label>
                            <input
                                id={`def-input-${x.name}`}
                                type="text"
                                style={{ width: "30%" }}
                                onBlur={(e) => handleOwnArrayPropertyChange(e.target.value, x.name)}
                            />
                        </div>
                    </div>
                )
                }
            </div>


            <button onClick={handleGenerateClick}>Generate</button>


        </div >


    );
};

export default OptionPane;
