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
              "expand one parameter at a time for each selection (click) of the expand icon."
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
              "expand all parameters when the expand icon is selected (clicked)"
            }
          />
        </label>
      </div>
    </div>
  );
};

export default ExpandableComponent;
