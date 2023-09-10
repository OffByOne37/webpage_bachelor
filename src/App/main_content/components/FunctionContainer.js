import React, { useState } from "react";
import {
  faFileCode,
  faPlusCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./css/Functions.css";
import { defaultFunction } from "./DefaultFunction";
import { HexColorPicker } from "react-colorful";
import HelpInformation from "./HelpInformation";

const FunctionContainer = ({
  functions,
  setFunctions,
  currFunction,
  setCurrFunction,
  namespace,
  setNamespace,
  namespaceColor,
  setNamespaceColor,
  namespaceIcon,
  setNamespaceIcon,
  namespaceWeight,
  setNamespaceWeigth,
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
        setFunctions((prevFunctions) => ({
          ...prevFunctions,
          [inputText]: { ...defaultFunction },
        }));
        setCurrFunction(inputText); // Set the current function
        togglePopup();
      } else {
        alert("Function name must be unique!");
      }
    }
  };

  const removeFunction = (functionName) => {
    setFunctions((prevFunctions) => {
      const newFunctions = { ...prevFunctions };
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

  const handleColorChange = (color) => {
    setNamespaceColor(color);
  };

  const handleIconChange = (iconCode) => {
    let newValue = iconCode.trim();
    setNamespaceIcon(newValue === "" ? undefined : newValue);
  };

  const handleWeightChange = (weight) => {
    let newValue = weight.replace(/\D/g, "");
    setNamespaceWeigth(newValue === "" ? undefined : newValue);
  };

  return (
    <div className="function-window">
      <h5>
        Please enter the namespace-name
        <HelpInformation help="This will be the name visible in the codeEditor." />
        :
      </h5>
      <input
        type="text"
        value={namespace}
        onChange={(e) => setNamespace(e.target.value)}
        required={showPopup}
      />
      <h5>
        Please select the namespace color
        <HelpInformation help="Pick color for the namespace. All blocks within the same namespace have the same color so that users can find the category easily from samples." />
        :
      </h5>
      <HexColorPicker color={namespaceColor} onChange={handleColorChange} />
      <h5>
        Please select the namespace icon
        <HelpInformation
          help={
            "Any free non-brand icon from Font Awesome (v5.15.4 at the time of writing) can be used. The full list can be found https://fontawesome.com/v5/search?m=free"
          }
        />
        :
      </h5>
      <input
        type="text"
        placeholder="Enter Unicode value"
        value={namespaceIcon}
        onChange={(e) => handleIconChange(e.target.value)}
      />

      <h5>
        Please enter namespace weight
        <HelpInformation
          help={
            "determines where your category appears in the toolbox. Higher weight means it appears closer to the top"
          }
        />
        :
      </h5>
      <input
        type="text"
        placeholder="Enter weight"
        value={namespaceWeight}
        onChange={(e) => handleWeightChange(e.target.value)}
      />

      <h5>Add your functions here:</h5>
      <div className="file-explorer">
        {Object.keys(functions).map((functionName) => (
          <div
            key={functionName}
            className={`file-item ${
              currFunction && currFunction === functionName ? "highlighted" : ""
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
