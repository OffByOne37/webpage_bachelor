import React, { useState } from "react";
import HelpInformation from "./HelpInformation";
import "./css/Functions.css";
import {
  faFileCode,
  faPlusCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EnumOptionPane = ({
  enumName,
  setEnumName,
  enumValues,
  setEnumValues,
}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [inputText, setInputText] = useState("");

  const togglePopup = () => {
    setShowPopup(!showPopup);
    setInputText("");
  };

  const addEnumValue = () => {
    if (inputText.trim() !== "") {
      if (!enumValues.hasOwnProperty(inputText)) {
        setEnumValues((prevValues) => ({
          ...prevValues,
          [inputText]: {
            visibleName: inputText,
            codeName: undefined,
            enumId: undefined,
            initializer: undefined,
          },
        }));
        togglePopup();
      } else {
        alert("Function name must be unique!");
      }
    }
  };

  const removeEnum = (enumValueName) => {
    setEnumValues((prevValues) => {
      const newValues = { ...prevValues };
      delete newValues[enumValueName];
      return newValues;
    });
  };


  const handleCodeNameChange = (enumValueName, enumCodeName) => {
    setEnumValues((prevValues) => ({
      ...prevValues,
      [enumValueName]: {
        ...prevValues[enumValueName],
        codeName:
          enumCodeName === "" ? undefined : enumCodeName.replace(/\s+/g, ""),
      },
    }));
  };

  const handleInitializerChange = (enumValueName, newInitializer) => {
    setEnumValues((prevValues) => ({
      ...prevValues,
      [enumValueName]: {
        ...prevValues[enumValueName],
        initializer: newInitializer === "" ? undefined : newInitializer.trim(),
      },
    }));
  };

  const handleIdChange = (enumValueName, newEnumId) => {
    setEnumValues((prevValues) => ({
      ...prevValues,
      [enumValueName]: {
        ...prevValues[enumValueName],
        enumId: newEnumId === "" ? undefined : newEnumId.replace(/\s+/g, ""),
      },
    }));
  };

  return (
    <div className="function-window">
      <h5>
        Please enter the enum name
        <HelpInformation help="This will be like a class/namespace name." />
        :
      </h5>
      <input
        type="text"
        value={enumName}
        onChange={(e) => setEnumName(e.target.value)}
        required={showPopup}
      />

      <h6>Add your enum values here:</h6>
      <div className="file-explorer">
        {Object.keys(enumValues).map((enumValueName) => (
          <div key={enumValueName}>
            <div className="file-item-content">
              <FontAwesomeIcon icon={faFileCode} className="file-icon" />
              {enumValueName}
              <button
                className="remove-button"
                onClick={() => removeEnum(enumValueName)}
              >
                <FontAwesomeIcon icon={faTimes} className="remove-icon" />
              </button>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <h7 style={{ width: "160px", marginRight: "10px" }}>
                Specific code name <HelpInformation help={"This code will be displayed in the source code of the enum. The user won't directly see this value if he works with blocks."}/>:
              </h7>
              <input
                type="text"
                value={enumValues[enumValueName]?.codeName}
                onChange={(e) =>
                  handleCodeNameChange(
                    enumValueName,
                    e.target.value
                  )
                }
              />
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <h7 style={{ width: "160px", marginRight: "10px" }}>
                Enum value id <HelpInformation help={"This will be a id assigned to the value. In case for references in the code or something else. The user won't directly see this value if he works with blocks."}/>:
              </h7>
              <input
                type="text"
                value={enumValues[enumValueName]?.enumId}
                onChange={(e) =>
                  handleIdChange(enumValueName, e.target.value)
                }
              />
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <h7 style={{ width: "160px", marginRight: "10px" }}>
                Enum initializer <HelpInformation help={"This code will be the default value of en enum entry."}/>:
              </h7>
              <input
                type="text"
                value={enumValues[enumValueName]?.initializer}
                onChange={(e) =>
                  handleInitializerChange(
                    enumValueName,
                    e.target.value
                  )
                }
              />
            </div>
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
            placeholder="This will be the value visible for the user in block editor."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            style={{ width: "400px" }}
          />
          <button onClick={addEnumValue}>Add</button>
          <button onClick={togglePopup}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default EnumOptionPane;
