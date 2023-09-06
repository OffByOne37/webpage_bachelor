import React from "react";

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
        Group
      </label>
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
