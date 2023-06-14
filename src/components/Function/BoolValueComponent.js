import React from "react";
import HelpInformation from "../HelpInformation";

const BoolValueComponent = ({ boolValue, setBoolValue, text, help }) => {
  return (
    <label style={{ color: boolValue ? "black" : "grey" }}>
      <input
        type="checkbox"
        checked={boolValue}
        onChange={() => setBoolValue(!boolValue)}
        style={{ marginRight: "4px" }}
      />
      {text}
      {help && <HelpInformation help={help} />}
    </label>
  );
};

export default BoolValueComponent;
