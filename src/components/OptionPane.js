import React, { useState, useEffect } from "react";

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



    const handleGenerateClick = () => {
        if (blockIDRequired && blockID === "") {
            alert("Please enter a BlockID");
            return;
        }

        generateFunction(blockID, inline, advanced, currFunctionName, languages, numberParameter);
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

            // // If the language code is not found, add a new language entry
            // if (!updatedLanguages.some((lang) => lang.code === code)) {
            //     updatedLanguages.push({ code: code, text: e.target.value });
            // }

            return updatedParameter;
        });
    }

    return (
        <div style={{ display: "flex", width: "100%", alignSelf: "flex-start", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", position: "absolute", top: "0", left: "0", overflowY: "scroll", height: "100%", maxHeight: "100%" }}>
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
            {
                <div>
                    {currParameters.filter(x => x.type === "number").map(x =>
                        <>
                            <div>
                                <h7>Specs of parameter {x.name}:</h7>
                            </div>
                            min Value:
                            <input
                                type="text"
                                style={{ marginRight: "4px", width: "15%" }}
                                onBlur={(e) => {
                                    const inputValue = e.target.value.trim();
                                    const isValidInput = /^[-0-9]+$/.test(inputValue);
                                
                                    // Handle the valid input value or assign "undefined"
                                    const value = isValidInput ? parseInt(inputValue) : "undefined";
                                    handlePropertyChange(value, x.name, "min");
                                }}

                            />
                            max Value:
                            <input
                                type="text"
                                style={{ marginRight: "4px", width: "15%" }}
                                onBlur={(e) => {
                                    const inputValue = e.target.value.trim();
                                    const isValidInput = /^[-0-9]+$/.test(inputValue);
                                
                                    // Handle the valid input value or assign "undefined"
                                    const value = isValidInput ? parseInt(inputValue) : "undefined";
                                    handlePropertyChange(value, x.name, "max");
                                }}
                            />
                            default Value:
                            <input
                                type="text"
                                style={{ marginRight: "4px", width: "15%" }}
                                onBlur={(e) => {
                                    const inputValue = e.target.value.trim();
                                    const isValidInput = /^[-0-9]+$/.test(inputValue);
                                
                                    // Handle the valid input value or assign "undefined"
                                    const value = isValidInput ? parseInt(inputValue) : "undefined";
                                    handlePropertyChange(value, x.name, "def");
                                }}
                            />



                        </>
                    )}
                </div>

            }
            {/* {numberAsParameter.length !== 0 &&
                <div>
                    {numberAsParameter.map(x =>
                        <>
                            <div>
                                <h7>Specs of parameter {x}:</h7>
                            </div>
                            <input
                                type="checkbox"
                                checked={blockIDRequired}
                                style={{ marginRight: "4px" }}
                                onChange={() => setBlockIDRequired(!blockIDRequired)}
                            />
                            BlockID
                        </>
                    )}
                </div>
            }
            {numberAsParameter.length === 0 &&
                <h7>Pasdfaramters</h7>
            } */}

            <button onClick={handleGenerateClick}>Generate</button>
        </div >


    );
};

export default OptionPane;
