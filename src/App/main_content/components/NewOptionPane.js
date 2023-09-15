import React, { useEffect } from "react";
import BlockIdComponent from "./Function/BlockIdComponent";
import BoolValueComponent from "./Function/BoolValueComponent";
import ExpandableComponent from "./Function/ExpandableComponent";
import GroupComponent from "./Function/GroupComponent";
import NameComponent from "./Function/NameComponent";
import NewParameterSection from "./Parameter/NewParameterSection";
import "./css/OptionPane.css";
import Warning from "./Warning";

const NewOptionPane = ({
  updateAttribute,
  updateNestedAttribute,
  optionPaneFunction,
}) => {
  //Function to look if there are multiple parameters with the same name
  useEffect(() => {
    const nameSet = new Set(
      optionPaneFunction.currParameter.map((parameter) => parameter.name)
    );
    updateAttribute(
      "duplicateNames",
      nameSet.size !== optionPaneFunction.currParameter.length
    );
  }, [optionPaneFunction.currParameter]);

  const handlePropertyChangeBoolean = (newPropVal, paramName, property) => {
    updateNestedAttribute("booleanParameter", paramName, property, newPropVal);
  };

  const handlePropertyChange = (newPropVal, paramName, property) => {
    updateNestedAttribute("numberParameter", paramName, property, newPropVal);
  };

  const handleCurrFunctionNameChange = (newName) => {
    updateAttribute("currFunctionName", newName);
  };

  return (
    <div className="option-pane">
      <h4>Options for your function</h4>
      <h5>Function section:</h5>

      <BlockIdComponent
        blockIDRequired={optionPaneFunction.blockIdRequired}
        setBlockIDRequired={(required) =>
          updateAttribute("blockIdRequired", required)
        }
        blockID={optionPaneFunction.blockId}
        setBlockID={(newId) => updateAttribute("blockId", newId)}
      />
      <GroupComponent
        group={optionPaneFunction.group}
        updateAttribute={updateAttribute}
      />

      <BoolValueComponent
        boolValue={optionPaneFunction.advanced}
        setBoolValue={(advanced) => updateAttribute("advanced", advanced)}
        text={"Advanced"}
        help={
          "This causes the block to be placed under the parent category's \"More...\"; subcategory. This is especially helpful for functions that are rarely used or more advanced, so they should not be visible always!"
        }
      />

      <BoolValueComponent
        boolValue={optionPaneFunction.inline}
        setBoolValue={(inline) => updateAttribute("inline", inline)}
        text={"Inline"}
        help={
          'To make a block with multiple parameters appear as a single line, tick this box. The block will expand left to right instead of wrapping the parameter input across mulitple lines. If unticked, it will switch to External Inputs mode, in which the parameters wrap instead of staying inline. In this case you can use "|" to specify where it should wrap around.'
        }
      />

      <ExpandableComponent
        value={optionPaneFunction.expandable}
        setValue={(expandable) => updateAttribute("expandable", expandable)}
      />

      {optionPaneFunction.expandable !== undefined &&
        !optionPaneFunction.currFunctionName.includes("||") && (
          <Warning
            message={
              'To indicate the location where you wish the function to expand, use the symbol \'||\'.'
            }
          />
        )}

      {!optionPaneFunction.currParameter.every((parameter) =>
        optionPaneFunction.currFunctionName.includes(`$${parameter.name}`)
      ) && (
        <Warning
          message={
            "All parameters need to be included in the function name with a preceded '$' symbol."
          }
        />
      )}

      {optionPaneFunction.duplicateNames && (
        <Warning
          message={
            "Duplicating parameter names lead to issues. To resolve this, please change the names and update the parameters accordingly."
          }
        />
      )}

      <NameComponent
        currFunctionName={optionPaneFunction.currFunctionName}
        setCurrFunctionName={handleCurrFunctionNameChange}
        setLanguages={(languages) => updateAttribute("languages", languages)}
        languages={optionPaneFunction.languages}
      />

      <NewParameterSection
        numberParameter={optionPaneFunction.numberParameter}
        handlePropertyChange={handlePropertyChange}
        booleanParameter={optionPaneFunction.booleanParameter}
        handlePropertyChangeBoolean={handlePropertyChangeBoolean}
        currParameters={optionPaneFunction.currParameter}
        setNumberParameter={handlePropertyChange}
        ownArrayParameter={optionPaneFunction.ownArrayParameter}
        updateAttribute={updateAttribute}
        updateNestedAttribute={updateNestedAttribute}
      />
    </div>
  );
};

export default NewOptionPane;
