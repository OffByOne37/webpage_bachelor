import React from "react";
import HelpInformation from "../HelpInformation";

const ExpandableComponent = ({ value, setValue }) => {
  return (
    <div>
      <div>
        <h7>Should the block be expandable:</h7>
      </div>
      <label>
        Yes(Enabled)
        <HelpInformation help={"expand one parameter at a time for each selection (click) of the expand icon."}/>
        <input
          type="checkbox"
          checked={value === "enabled"}
          onChange={(e) => setValue(e.target.checked ? "enabled" : "null")}
        />
      </label>
      <label>
        Yes(Toggle)
        <HelpInformation help={"expand all parameters when the the expand icon is selected (clicked)"}/>
        <input
          type="checkbox"
          checked={value === "toggle"}
          onChange={(e) => setValue(e.target.checked ? "toggle" : "null")}
        />
      </label>
      
    </div>
  );
};

export default ExpandableComponent;
