import React, { useState, useEffect } from "react";
import BlockIdComponent from "./Function/BlockIdComponent";
import BoolValueComponent from "./Function/BoolValueComponent";
import ExpandableComponent from "./Function/ExpandableComponent";
import NameComponent from "./Function/NameComponent";
import ParameterSection from "./Parameter/ParameterSection";
import NewParameterSection from "./Parameter/NewParameterSection";
import GroupComponent from "./Function/GroupComponent";

const NewOptionPane = ({
  updateAttribute,
  updateNestedAttribute,
  optionPaneFunction,
}) => {
  // useEffect(() => {

  //    const defaultVal = `function ${optionPaneFunction.currParameter
  //      .map((param) => `$${param.name}`)
  //      .join(" ")}`;
  //    updateAttribute("currFunctionName", defaultVal);
  // }, [optionPaneFunction.currParameter]);

  useEffect(() => {
    const existingParamNames = optionPaneFunction.currParameter.map((param) => param.name);
    const missingParamNames = existingParamNames.filter(
      (paramName) => !optionPaneFunction.currFunctionName.includes(`$${paramName}`)
    );
  
    if (missingParamNames.length > 0) {
      const updatedFunctionName = `${[...optionPaneFunction.currFunctionName.split(' '), ...missingParamNames.map(name => `$${name}`)].join(' ')}`;
      updateAttribute("currFunctionName", updatedFunctionName);
    }
  }, [optionPaneFunction.currFunctionName, optionPaneFunction.currParameter]);
  

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

  useEffect(() => {
    const extractElementNames = () => {
      const filteredElements = optionPaneFunction.currParameter.filter(
        (param) =>
          param.type &&
          param.type.includes("[]") &&
          !param.type.includes("string[]") &&
          !param.type.includes("boolean[]") &&
          !param.type.includes("number[]")
      );

      const extractedElements = filteredElements.map((param) => {
        const existingElement = Object.keys(
          optionPaneFunction.ownArrayParameter
        ).find((element) => element.name === param.name);

        if (existingElement) {
          return existingElement; // Preserve the existing information
        } else {
          return {
            name: param.name,
            def: undefined,
          };
        }
      });

      // Concatenate the existing array and the extracted elements array
      // const newArray = [...optionPaneFunction.ownArrayParameter, ...extractedElements];
      updateAttribute("ownArrayParameter", extractedElements);
      console.log(57);
      console.log(optionPaneFunction.ownArrayParameter);
    };

    extractElementNames();
  }, [optionPaneFunction.currParameter]);

  //   const handleGenerateClick = () => {
  //     if (blockIDRequired && blockID === "") {
  //       alert("Please enter a BlockID");
  //       return;
  //     }

  //     if (expandable !== "null" && !currFunctionName.includes("||")) {
  //       alert(
  //         'You need to enter a "||" in your functionName otherwise your function is not expandable!'
  //       );
  //       return;
  //     }

  //     if (
  //       !currParameters.every((parameter) =>
  //         currFunctionName.includes(`$${parameter.name}`)
  //       )
  //     ) {
  //       alert("You need to include all parameters with an $ in front!");
  //       return;
  //     }

  //     if (duplicateNames) {
  //       alert(
  //         "Duplicate Parameter name causes problems!! Please Change the names and refresh the parameters"
  //       );
  //       return;
  //     }

  //     generateFunction(
  //       blockID,
  //       inline,
  //       advanced,
  //       currFunctionName,
  //       languages,
  //       numberParameter,
  //       expandable,
  //       ownArrayParameter,
  //       booleanParameter
  //     );
  //   };

  //   const handlePropertyChangeForAll = (
  //     newPropVal,
  //     paramName,
  //     property,
  //     setParameter
  //   ) => {
  //     setParameter((prevParameter) => {
  //       const updatedParameter = [...prevParameter];
  //       for (let i = 0; i < updatedParameter.length; i++) {
  //         const x = updatedParameter[i];
  //         if (x.name === paramName) {
  //           if (newPropVal !== undefined) {
  //             x[property] = newPropVal;
  //           } else {
  //             x[property] = undefined;
  //           }
  //           break; // Exit the loop after updating the parameter
  //         }
  //       }
  //       return updatedParameter;
  //     });
  //   };

  const handlePropertyChangeBoolean = (newPropVal, paramName, property) => {
    console.log(paramName);
    console.log(property);
    console.log(newPropVal);
    updateNestedAttribute("booleanParameter", paramName, property, newPropVal);
  };

  const handlePropertyChange = (newPropVal, paramName, property) => {
    updateNestedAttribute("numberParameter", paramName, property, newPropVal);
  };

  const handleCurrFunctionNameChange = (newName) => {
    updateAttribute("currFunctionName", newName);
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        alignSelf: "flex-start",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        position: "relative",
        top: "0",
        left: "0",
        overflowY: "scroll",
        height: "100%",
        maxHeight: "100%",
      }}
    >
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
        boolValue={optionPaneFunction.inline}
        setBoolValue={(inline) => updateAttribute("inline", inline)}
        text={"Inline"}
        help={
          "This causes the block parameters to wrap across multiple lines instead of staying boolValue."
        }
      />
      <BoolValueComponent
        boolValue={optionPaneFunction.advanced}
        setBoolValue={(advanced) => updateAttribute("advanced", advanced)}
        text={"Advanced"}
        help={
          "This causes the block to be placed under the parent category's &quot;More...&quot; subcategory. This is especially helpful for functions that are rarely used or more advanced, so they should not be visible always!"
        }
      />
      <ExpandableComponent
        value={optionPaneFunction.expandable}
        setValue={(expandable) => updateAttribute("expandable", expandable)}
      />

      <div>
        {optionPaneFunction.expandable !== "null" &&
          !optionPaneFunction.currFunctionName.includes("||") && (
            <h7 style={{ color: "red" }}>
              You need to enter "||" in the place where you want your function
              to expand!
            </h7>
          )}
      </div>
      <div>
        {!optionPaneFunction.currParameter.every((parameter) =>
          optionPaneFunction.currFunctionName.includes(`$${parameter.name}`)
        ) && (
          <h7 style={{ color: "red" }}>
            You need to include all parameters with an $ in front!
          </h7>
        )}
      </div>
      <div>
        {optionPaneFunction.duplicateNames && (
          <h7 style={{ color: "red" }}>
            Duplicate Parameter name causes problems!! Please Change the names
            and refresh the parameters
          </h7>
        )}
      </div>

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

      {/* <button onClick={handleGenerateClick}>Generate</button> */}
    </div>
  );
};

export default NewOptionPane;
