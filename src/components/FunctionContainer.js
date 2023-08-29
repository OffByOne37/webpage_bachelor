import React, { useState } from "react";
import "./Functions.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faFileCode,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

const FunctionContainer = ({
  functions,
  setFunctions,
  currFunction,
  setCurrFunction,
}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [inputText, setInputText] = useState("");

  const togglePopup = () => {
    setShowPopup(!showPopup);
    setInputText("");
  };

  const addFunction = () => {
    if (inputText.trim() !== "") {
      if (!functions.hasOwnProperty(inputText)) {
        setFunctions(prevFunctions => ({...prevFunctions, [inputText]: {
          code: "// Please add your code here!",
          blockIdRequired: false,
          blockId : "",
          advanced: false,
          currFunctionName: "",
          languages: [],
          numberParameter: [],
          ownArrayParameter: [],
          booleanParameter: [],
          expandable: "null",
          duplicateNames: false,
          currParameter: [],
          finalFunction:"",
        }}))
        setCurrFunction(inputText); // Set the current function
        togglePopup();
      } else {
        alert("Function name must be unique!");
      }
    }
  };

  const removeFunction = (functionName) => {
    setFunctions(prevFunctions => {
      const newFunctions = {...prevFunctions};
      delete newFunctions[functionName];
      return newFunctions;
    });
    if (functionName === currFunction) {
      setCurrFunction(null);
    }
  };

  const handleFunctionClick = (functionName) => {
    setCurrFunction(functionName); 
  };

  return (
    <div className="function-window">
      <h5>Add your functions here:</h5>
      <div className="file-explorer">
        {Object.keys(functions).map((functionName) => (
          <div
            key={functionName}
            className={`file-item ${
              currFunction && currFunction === functionName
                ? "highlighted"
                : ""
            }`}
            onClick={() => handleFunctionClick(functionName)}
          >
            <div className="file-item-content">
              <FontAwesomeIcon icon={faFileCode} className="file-icon" />
              {functionName}
            </div>
            <button
              className="remove-button"
              onClick={() => removeFunction(functionName)}
            >
              <FontAwesomeIcon icon={faTimes} className="remove-icon" />
            </button>
          </div>
        ))}
      </div>

      <button className="add-button" onClick={togglePopup}>
        <FontAwesomeIcon icon={faPlusCircle} className="icon" />
      </button>
      {showPopup && (
        <div className="function-popup">
          <input
            type="text"
            placeholder="Enter function name"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            style={{ width: "200px" }}
          />
          <button onClick={addFunction}>Add</button>
          <button onClick={togglePopup}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default FunctionContainer;
