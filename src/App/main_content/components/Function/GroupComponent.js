import React from "react";
import Warning from "../Warning";
import HelpInformation from "../HelpInformation";

const GroupComponent = ({
  group,
  updateAttribute
}) => {
    

    const togglePopup = () => {
        handleTextInput(group===undefined?"":undefined)
    };

    const handleTextInput = (newValue) =>{
        updateAttribute("group", newValue);
    }
  

  return (
    <>
      <label style={{ color: !(group===undefined) ? "black" : "grey" }}>
        <input
          type="checkbox"
          checked={!(group===undefined)}
          style={{ marginRight: "4px" }}
          onChange={() => togglePopup()}
        />
        Group <HelpInformation help={"You can make your block category more organized by grouping similar or related blocks together inside groups. When using the groups feature, blocks of the same group will appear together in the toolbox flyout and the group's label will be displayed above them. This makes it easier for the user to go through your available blocks."}/>
      </label>
      {group === "" && (
        <Warning message={"Plase Enter a corresponding Group."} />
      )}
      {!(group===undefined) && (
        <input
          type="text"
          value={group}
          onChange={(e) => handleTextInput(e.target.value)}
          required={!(group===undefined)}
        />
      )}
    </>
  );
};

export default GroupComponent;
