import React from "react";
import HelpInformation from "../HelpInformation";

const ExpandableComponent = ({ value, setValue }) => {
  return (
    <div>
      <div>
        <h7>Should the block be expandable:</h7>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={value === "enabled"}
            onChange={(e) => setValue(e.target.checked ? "enabled" : undefined)}
          />
          Yes(Enabled)
          <HelpInformation
            help={
              "For each click of the expand icon, one parameter will be expanded at a time."
            }
          />
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={value === "toggle"}
            onChange={(e) => setValue(e.target.checked ? "toggle" : undefined)}
          />
          Yes(Toggle)
          <HelpInformation
            help={
              "Expand all parameters when the expand icon is selected (clicked)."
            }
          />
        </label>
      </div>
    </div>
  );
};

export default ExpandableComponent;
