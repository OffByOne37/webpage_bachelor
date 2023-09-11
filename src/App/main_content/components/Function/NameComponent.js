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
          "You need to have all parameters inside this textarea with a leading $. If the button \"Inline\" is not clicked, you can enter \"|\" to specify where a new line should start."
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
