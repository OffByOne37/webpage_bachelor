import React from "react";
import LanguageComponent from "./LanguageComponent";
import HelpInformation from "../HelpInformation";


const NameComponent = ({languages, currFunctionName, setCurrFunctionName, setLanguages }) => {

  return (
    <div style={{ width: "100%" }}>
      Name of block
      <HelpInformation help={"Please don't change the parameters, otherwise there will be an error! You need to have all parameters inside this textare with an $ in front"}/>
      :
      <input
        type="text"
        defaultValue={currFunctionName}
        onChange={(e) => setCurrFunctionName(e.target.value)}
        style={{ marginLeft: "4px" }}
      />
      <LanguageComponent languages={languages} currFunctionName={currFunctionName} setLanguages={setLanguages}/>
    </div>
  );
};

export default NameComponent;
