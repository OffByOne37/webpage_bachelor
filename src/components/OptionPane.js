import React, { useEffect, useState } from "react";
import BlockIdComponent from "./Function/BlockIdComponent";
import BoolValueComponent from "./Function/BoolValueComponent";
import ExpandableComponent from "./Function/ExpandableComponent";
import NameComponent from "./Function/NameComponent";
import ParameterSection from "./Parameter/ParameterSection";

const OptionPane = ({
  generateFunction,
  currParameters,
}) => {
  const [blockIDRequired, setBlockIDRequired] = useState(false);
  const [blockID, setBlockID] = useState("");
  const [inline, setInline] = useState(false);
  const [advanced, setAdvanced] = useState(false);
  const [currFunctionName, setCurrFunctionName] = useState("");
  const [languages, setLanguages] = useState([]);
  const [numberParameter, setNumberParameter] = useState([]);
  const [ownArrayParameter, setOwnArrayParameter] = useState([]);
  const [booleanParameter, setBooleanParameter] = useState([]);
  const [expandable, setExpandable] = useState("null");
  //Boolean to be true/false depending if multiple parameter have same name
  const [duplicateNames, setDuplicateNames] = useState(false);

  useEffect(() => {
    const defaultVal = `function ${currParameters
      .map((param) => `$${param.name}`)
      .join(" ")}`;
    setCurrFunctionName(defaultVal);
  }, [currParameters]);

  //Function to look if there are multiple parameters with the same name
  useEffect(() => {
    const nameSet = new Set(currParameters.map((parameter) => parameter.name));
    setDuplicateNames(nameSet.size !== currParameters.length);
  }, [currParameters]);

  //function to update parameters. (Old parameters should keep their values)
  useEffect(() => {
    const generateUpdatedParameters = (prevParameters, type) => {
      console.log(currParameters.map(x => x.type));
      return currParameters
        .map((param) => {
          if (param.type && param.type === type) {
            const existingParam = prevParameters.find(
              (prevParam) => prevParam.name === param.name
            );
            if (existingParam) {
              return { ...existingParam };
            } else {
              return {
                name: param.name,
                min: undefined,
                max: undefined,
                def: undefined,
                editorField: undefined,
                shadow: undefined,
              };
            }
          } else {
            return null;
          }
        })
        .filter(Boolean);
    };

    setNumberParameter((prevParameters) =>
      generateUpdatedParameters(prevParameters, "number")
    );
    setBooleanParameter((prevParameters) =>
      generateUpdatedParameters(prevParameters, "boolean")
    );
  }, [currParameters]);

  useEffect(() => {
    const extractElementNames = () => {
      const filteredElements = currParameters.filter(
        (param) =>
          param.type &&
          param.type.includes("[]") &&
          !param.type.includes("string[]") &&
          !param.type.includes("boolean[]") &&
          !param.type.includes("number[]")
      );
  
      const extractedElements = filteredElements.map((param) => {
        const existingElement = ownArrayParameter.find(
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
  
      setOwnArrayParameter((prevParameter) => [...prevParameter, ...extractedElements]);
    };
  
    extractElementNames();
  }, [currParameters]);
  
  

  const handleGenerateClick = () => {
    if (blockIDRequired && blockID === "") {
      alert("Please enter a BlockID");
      return;
    }

    if (expandable !== "null" && !currFunctionName.includes("||")) {
      alert(
        'You need to enter a "||" in your functionName otherwise your function is not expandable!'
      );
      return;
    }

    if (
      !currParameters.every((parameter) =>
        currFunctionName.includes(`$${parameter.name}`)
      )
    ) {
      alert("You need to include all parameters with an $ in front!");
      return;
    }

    if (duplicateNames) {
      alert(
        "Duplicate Parameter name causes problems!! Please Change the names and refresh the parameters"
      );
      return;
    }

    generateFunction(
      blockID,
      inline,
      advanced,
      currFunctionName,
      languages,
      numberParameter,
      expandable,
      ownArrayParameter,
      booleanParameter
    );
  };

  const handlePropertyChangeForAll = (
    newPropVal,
    paramName,
    property,
    setParameter
  ) => {
    setParameter((prevParameter) => {
      const updatedParameter = [...prevParameter];
      for (let i = 0; i < updatedParameter.length; i++) {
        const x = updatedParameter[i];
        if (x.name === paramName) {
          if (newPropVal !== undefined) {
            x[property] = newPropVal;
          } else {
            x[property] = undefined;
          }
          break; // Exit the loop after updating the parameter
        }
      }
      return updatedParameter;
    });
  };

  const handlePropertyChangeBoolean = (newPropVal, paramName, property) => {
    handlePropertyChangeForAll(
      newPropVal,
      paramName,
      property,
      setBooleanParameter
    );
  };

  const handlePropertyChange = (newPropVal, paramName, property) => {
    handlePropertyChangeForAll(
      newPropVal,
      paramName,
      property,
      setNumberParameter
    );
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
        blockIDRequired={blockIDRequired}
        setBlockIDRequired={setBlockIDRequired}
        blockID={blockID}
        setBlockID={setBlockID}
      />
      <BoolValueComponent
        boolValue={inline}
        setBoolValue={setInline}
        text={"Inline"}
        help={
          "This causes the block parameters to wrap across multiple lines instead of staying boolValue."
        }
      />
      <BoolValueComponent
        boolValue={advanced}
        setBoolValue={setAdvanced}
        text={"Advanced"}
        help={
          "This causes the block to be placed under the parent category's &quot;More...&quot; subcategory. This is especially helpful for functions that are rarely used or more advanced, so they should not be visible always!"
        }
      />
      <ExpandableComponent value={expandable} setValue={setExpandable} />

      <div>
        {expandable !== "null" && !currFunctionName.includes("||") && (
          <h7 style={{ color: "red" }}>
            You need to enter "||" in the place where you want your function to
            expand!
          </h7>
        )}
      </div>
      <div>
        {!currParameters.every((parameter) =>
          currFunctionName.includes(`$${parameter.name}`)
        ) && (
          <h7 style={{ color: "red" }}>
            You need to include all parameters with an $ in front!
          </h7>
        )}
      </div>
      <div>
        {duplicateNames && (
          <h7 style={{ color: "red" }}>
            Duplicate Parameter name causes problems!! Please Change the names
            and refresh the parameters
          </h7>
        )}
      </div>

      <NameComponent
        currFunctionName={currFunctionName}
        setCurrFunctionName={setCurrFunctionName}
        setLanguages={setLanguages}
        languages={languages}
      />

      <ParameterSection
        numberParameter={numberParameter}
        handlePropertyChange={handlePropertyChange}
        booleanParameter={booleanParameter}
        handlePropertyChangeBoolean={handlePropertyChangeBoolean}
        currParameters={currParameters}
        setNumberParameter={setNumberParameter}
        ownArrayParameter={ownArrayParameter}
        setOwnArrayParameter={setOwnArrayParameter}
      />

      <button onClick={handleGenerateClick}>Generate</button>
    </div>
  );
};

export default OptionPane;
