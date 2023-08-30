import React, { useEffect } from "react";
import LanguageComponent from "./LanguageComponent";
import HelpInformation from "../HelpInformation";


const NameComponent = ({ languages, setLanguages, currFunctionName, setCurrFunctionName }) => {
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setCurrFunctionName(newValue);
  };

  // This effect will log the updated currFunctionName whenever it changes
  useEffect(() => {
    console.log("Updated currFunctionName:", currFunctionName);
  }, [currFunctionName]);

  return (
    <div style={{ width: "100%" }}>
      Name of block
      <HelpInformation
        help={
          "Please don't change the parameters, otherwise there will be an error! You need to have all parameters inside this textare with an $ in front"
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
