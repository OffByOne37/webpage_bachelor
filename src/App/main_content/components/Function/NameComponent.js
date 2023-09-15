import React, { useEffect } from "react";
import HelpInformation from "../HelpInformation";
import LanguageComponent from "./LanguageComponent";


const NameComponent = ({ languages, setLanguages, currFunctionName, setCurrFunctionName }) => {
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setCurrFunctionName(newValue);
  };


  return (
    <div style={{ width: "100%" }}>
      Name of block
      <HelpInformation
        help={
          "All parameters must be enclosed within this textarea, each preceded by a '$' symbol. If the 'Inline' button is not selected, you can use the '|' character to indicate where a new line should begin."
        }
      />
      :
      <input
        type="text"
        value={currFunctionName}
        onInput={handleInputChange}
        style={{ marginLeft: "4px" }}
      />
      <LanguageComponent
        languages={languages}
        currFunctionName={currFunctionName}
        setLanguages={setLanguages}
      />
    </div>
  );
};


export default NameComponent;
