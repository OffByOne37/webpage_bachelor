import React, { useState, useEffect, useCallback } from "react";
import NumberParameterBlock from "./Parameter/Number/NumberParameterBlock";
import BooleanParameterBlock from "./Parameter/Boolean/BooleanParameterBlock";
import BlockIdComponent from "./Function/BlockIdComponent";
import BoolValueComponent from "./Function/BoolValueComponent";
import ExpandableComponent from "./Function/ExpandableComponent";
import NameComponent from "./Function/NameComponent";

const OptionPane = ({ generateFunction, refreshParameters, currParameters, }) => {
    const [blockIDRequired, setBlockIDRequired] = useState(false);
    const [blockID, setBlockID] = useState("");
    const [inline, setInline] = useState(false);
    const [advanced, setAdvanced] = useState(false);
    const [currFunctionName, setCurrFunctionName] = useState("");
    const [languages, setLanguages] = useState([]);
    const [numberParameter, setNumberParameter] = useState([]);
    const [ownArrayParameter, setOwnArrayParameter] = useState([]);
    const [booleanParameter, setBooleanParameter] = useState([]);
    const [expandable, setExpandable] = useState("null");
    //Boolean to be true/false depending if multiple parameter have same name
    const [duplicateNames, setDuplicateNames] = useState(false);


    useEffect(() => {
        const defaultVal = `function ${currParameters.map(param => `$${param.name}`).join(' ')}`;
        setCurrFunctionName(defaultVal);
    }, [currParameters]);


    //Function to look if there are multiple parameters with the same name
    useEffect(() => {
        const nameSet = new Set(currParameters.map(parameter => parameter.name));
        setDuplicateNames(nameSet.size !== currParameters.length);
    }, [currParameters]);

    //function to update parameters. (Old parameters should keep their values)
    useEffect(() => {
        const generateUpdatedParameters = (prevParameters, type) => {
          return currParameters.map((param) => {
            if (param.type === type) {
              const existingParam = prevParameters.find((prevParam) => prevParam.name === param.name);
              if (existingParam) {
                return { ...existingParam };
              } else {
                return {
                  name: param.name,
                  min: undefined,
                  max: undefined,
                  def: undefined,
                  editorField: undefined,
                  shadow: undefined,
                };
              }
            } else {
              return null;
            }
          }).filter(Boolean);
        };
      
        setNumberParameter((prevParameters) => generateUpdatedParameters(prevParameters, "number"));
        setBooleanParameter((prevParameters) => generateUpdatedParameters(prevParameters, "boolean"));
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

        if (!(currParameters.every(parameter => currFunctionName.includes(`$${parameter.name}`)))) {
            alert("You need to include all parameters with an $ in front!");
            return;
        }

        if (duplicateNames) {
            alert("Duplicate Parameter name causes problems!! Please Change the names and refresh the parameters");
            return;
        }

        generateFunction(blockID, inline, advanced, currFunctionName, languages, numberParameter, expandable, ownArrayParameter, booleanParameter);
    };




  

    const handlePropertyChangeBoolean = (newPropVal, paramName, property) => {
        setBooleanParameter((prevParameter) => {
            const updatedParameter = prevParameter.map((x) => {
                if (x.name === paramName) {
                    if (newPropVal !== undefined) {
                        return { ...x, [property]: newPropVal };
                    } else {
                        console.log("asdfasdf");
                        return { ...x, [property]: undefined }
                    }
                }
                return x;
            });


            return updatedParameter;
        });
    };

    const handlePropertyChange = (newPropVal, paramName, property) => {
        setNumberParameter((prevParameter) => {
            const updatedParameter = prevParameter.map((x) => {
                if (x.name === paramName) {
                    if (newPropVal !== undefined) {
                        return { ...x, [property]: newPropVal };
                    } else {
                        console.log("asdfasdf");
                        return { ...x, [property]: undefined }
                    }
                }
                return x;
            });


            return updatedParameter;
        });
    }

    const handleOwnArrayPropertyChange = (value, name) => {
        setOwnArrayParameter((prevParameter) => {
            const updatedParameter = prevParameter.map((x) => {
                if (x.name === name) {
                    return { ...x, defaultValue: (value === "" ? null : value) };
                }
                return x;
            });
            return updatedParameter;
        });
    }

    const handleNumberChange = (checked, numberName) => {
        if (checked) {
            setNumberParameter((prevParameter) => [...prevParameter, { name: [numberName], min: undefined, max: undefined, def: undefined }]);
        } else {
            setNumberParameter(numberParameter.filter((x) => x.name !== numberName));
        }
    }

    return (
        <div style={{ display: "flex", width: "100%", alignSelf: "flex-start", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", position: "relative", top: "0", left: "0", overflowY: "scroll", height: "100%", maxHeight: "100%" }}>
            <h4>Options for your function</h4>
            <h5>Function section:</h5>

            <BlockIdComponent blockIDRequired={blockIDRequired} setBlockIDRequired={setBlockIDRequired} blockID={blockID} setBlockID={setBlockID}/>
            <BoolValueComponent boolValue={inline} setBoolValue={setInline} text={"Inline"} help={"This causes the block parameters to wrap across multiple lines instead of staying boolValue."}/>
            <BoolValueComponent boolValue={advanced} setBoolValue={setAdvanced} text={"Advanced"} help={"This causes the block to be placed under the parent category's &quot;More...&quot; subcategory. This is especially helpful for functions that are rarely used or more advanced, so they should not be visible always!"}/>
            <ExpandableComponent value={expandable} setValue={setExpandable}/>

            <div>
                {
                    expandable !== "null" && !(currFunctionName.includes("||")) &&
                    <h7 style={{ color: "red" }}>You need to enter "||" in the place where you want your function to expand!</h7>
                }
            </div>
            <div>
                {
                    !(currParameters.every(parameter => currFunctionName.includes(`$${parameter.name}`))) &&
                    <h7 style={{ color: "red" }}>You need to include all parameters with an $ in front!</h7>
                }
            </div>
            <div>
                {duplicateNames &&
                    <h7 style={{ color: "red" }}>Duplicate Parameter name causes problems!! Please Change the names and refresh the parameters</h7>}
            </div>

            <NameComponent currFunctionName={currFunctionName} setCurrFunctionName={setCurrFunctionName} setLanguages={setLanguages} languages={languages}/> 

            {/* <div style={{ width: "100%" }}>
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
                    defaultValue={currFunctionName}
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

            </div> */}



            <h5>Parameter section:</h5>
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
            {numberParameter.length !== 0 && (
                <>
                    <h7>Number</h7>
                    {numberParameter.map(x => (
                        <NumberParameterBlock
                            key={x.name} // Use a unique value as the key to trigger re-render
                            parameter={x}
                            handlePropertyChange={handlePropertyChange}
                        />
                    ))}
                </>
            )}

            {booleanParameter.length !== 0 && (
                <>
                    <h7>Boolean</h7>

                    {booleanParameter.map(x =>
                        <BooleanParameterBlock key={x.name} parameter={x} handlePropertyChangeBoolean={handlePropertyChangeBoolean} />)}

                    <div>
                        {currParameters.filter(x => x.type === undefined).map(x =>
                            <div>
                                Click if parameter "{x.name}" is a number:
                                <input
                                    type="checkbox"
                                    onChange={(e) => handleNumberChange(e.target.checked, x.name)}
                                />
                            </div>
                        )}
                    </div>
                </>
            )}
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
