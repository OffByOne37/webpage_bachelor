import React, { useEffect, useState } from "react";
import NewGetDefaultValue from "./helper/NewGetDefaultValue";
import OwnPiano from "./helper/Piano";

const NewNoteEditor = ({ parameter, handlePropertyChange }) => {
  const [manualInput, setManualInput] = useState(false); // State to track manual input

  useEffect(() => {
    handlePropertyChange("note", parameter, "editorField");
  }, []);

  const handleCheckboxChange = () => {
    setManualInput(!manualInput); // Toggle the manualInput state
  };

  return (
    <>
          {manualInput ? (
        <NewGetDefaultValue
          parameter={parameter}
          handlePropertyChange={handlePropertyChange}
          onlyNumber={true}
        />
      ) : (
        <OwnPiano
          parameter={parameter}
          handlePropertyChange={handlePropertyChange}
        />
      )}
      <label>
        <input
          type="checkbox"
          checked={manualInput}
          onChange={handleCheckboxChange}
        />
        Enter HZ Manually
      </label>
    </>
  );
};

export default NewNoteEditor;
