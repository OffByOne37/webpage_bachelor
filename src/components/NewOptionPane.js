import React, { useState, useEffect } from "react";
import BlockIdComponent from "./Function/BlockIdComponent";
import BoolValueComponent from "./Function/BoolValueComponent";
import ExpandableComponent from "./Function/ExpandableComponent";
import NameComponent from "./Function/NameComponent";
import ParameterSection from "./Parameter/ParameterSection";

const NewOptionPane = ({
    updateAttribute,
    optionPaneFunction
}) => {

  useEffect(() => {
    const defaultVal = `function ${optionPaneFunction.currParameter
      .map((param) => `$${param.name}`)
      .join(" ")}`;
    updateAttribute("currFunctionName", defaultVal)
  }, [optionPaneFunction.currParameter]);

  //Function to look if there are multiple parameters with the same name
  useEffect(() => {
    const nameSet = new Set(optionPaneFunction.currParameter.map((parameter) => parameter.name));
    // setDuplicateNames(nameSet.size !== optionPaneFunction.currParameters.length);
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
        const existingElement = optionPaneFunction.ownArrayParameter.find(
          (element) => element.name === param.name
        );
  
        if (existingElement) {
          return existingElement; // Preserve the existing information
        } else {
          return {
            name: param.name,
            def: undefined,
          };
        }
      });
      updateAttribute("ownArrayParameter",(prevParameter) => [...prevParameter, ...extractedElements])
  
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
    // handlePropertyChangeForAll(
    //   newPropVal,
    //   paramName,
    //   property,
    //   setBooleanParameter
    // );
  };

  const handlePropertyChange = (newPropVal, paramName, property) => {
    // handlePropertyChangeForAll(
    //   newPropVal,
    //   paramName,
    //   property,
    //   setNumberParameter
    // );
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
        blockIDRequired={optionPaneFunction.blockIDRequired}
        setBlockIDRequired={optionPaneFunction.setBlockIDRequired}
        blockID={optionPaneFunction.blockID}
        // setBlockID={optionPaneFunction.setBlockID}
      />
      <BoolValueComponent
        boolValue={optionPaneFunction.inline}
        // setBoolValue={optionPaneFunction.setInline}
        text={"Inline"}
        help={
          "This causes the block parameters to wrap across multiple lines instead of staying boolValue."
        }
      />
      <BoolValueComponent
        boolValue={optionPaneFunction.advanced}
        // setBoolValue={(optionPaneFunction.setAdvanced)}
        text={"Advanced"}
        help={
          "This causes the block to be placed under the parent category's &quot;More...&quot; subcategory. This is especially helpful for functions that are rarely used or more advanced, so they should not be visible always!"
        }
      />
      <ExpandableComponent value={optionPaneFunction.expandable} 
    //   setValue={setExpandable} 
      />

      <div>
        {optionPaneFunction.expandable !== "null" && !optionPaneFunction.currFunctionName.includes("||") && (
          <h7 style={{ color: "red" }}>
            You need to enter "||" in the place where you want your function to
            expand!
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
        // setCurrFunctionName={setCurrFunctionName}
        // setLanguages={setLanguages}
        languages={optionPaneFunction.languages}
      />

      <ParameterSection
        numberParameter={optionPaneFunction.numberParameter}
        // handlePropertyChange={handlePropertyChange}
        booleanParameter={optionPaneFunction.booleanParameter}
        // handlePropertyChangeBoolean={handlePropertyChangeBoolean}
        currParameters={optionPaneFunction.currParameter}
        // setNumberParameter={setNumberParameter}
        //TODO: chamge
        ownArrayParameter={[]}
        // setOwnArrayParameter={setOwnArrayParameter}
      />

      {/* <button onClick={handleGenerateClick}>Generate</button> */}
    </div>
  );
};

export default NewOptionPane;
