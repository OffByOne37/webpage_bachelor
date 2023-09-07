import React, { useState } from "react";
import SplitPane, { Pane } from "split-pane-react";
import isEqual from "lodash/isEqual";


import "split-pane-react/esm/themes/default.css";
import "./css/Multiple.css"
import "./css/MainContent.css"


import CodeEditor from "./components/CodeEditor";
import DownloadCodeEditor from "./components/DownloadCodeEditor";
import FunctionContainer from "./components/FunctionContainer";
import NewOptionPane from "./components/NewOptionPane";
import GenerateButton from "./components/GenerateButton";
import { generateCodeForFunction } from "./generateFunctionFile";

const Multiple = () => {
  const [finalFunction, setFinalFunction] = useState(
    "//Your Code will be displayed here after generation"
  );
  const [currFunction, setCurrFunction] = useState(null);
  const [functions, setFunctions] = useState({});
  const [namespace, setNamespace] = useState("not_defined");

  const [sizes, setSizes] = useState(["20%", "40%", "22%", "3%", "15%"]);

  const updateFunctionCode = (code) => {
    updateAttribute("code", code);

    const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm;
    const ARGUMENT_NAMES = /([^\s,]+(?:\s+[^\s,]+)*)/g;

    const fnStr = code.replace(STRIP_COMMENTS, "");
    const match = fnStr.match(/function\s*\w*\s*\(([^)]*)\)/);
    if (match === null || match.length < 2) {
      if (functions[currFunction].currParameter.length != 0) {
        updateAttribute("currParameter", []);
      }
      return;
    }

    const parameters = match[1].match(ARGUMENT_NAMES);
    if (parameters === null) {
      if (functions[currFunction].currParameter.length != 0) {
        updateAttribute("currParameter", []);
      }
      return;
    }

    const result = parameters.map((param) => {
      const [name, type] = param.split(":").map((item) => item.trim());
      return { name, type: type || undefined };
    });

    if (!isEqual(functions[currFunction].currParameter, result)) {
      updateAttribute("currParameter", result);
      console.log(result);
    }

    const generateUpdatedParameters = (prevParameters, type) => {
      const updatedParameters = {};

      result.forEach((param) => {
        if (param.type && param.type === type) {
          if (prevParameters[param.name]) {
            updatedParameters[param.name] = { ...prevParameters[param.name] };
          } else {
            updatedParameters[param.name] = {
              min: undefined,
              max: undefined,
              def: undefined,
              editorField: undefined,
              shadow: undefined,
            };
          }
        }
      });

      return updatedParameters;
    };

    updateAttribute(
      "numberParameter",
      generateUpdatedParameters(
        functions[currFunction].numberParameter,
        "number"
      )
    );
    updateAttribute(
      "booleanParameter",
      generateUpdatedParameters(
        functions[currFunction].booleanParameter,
        "boolean"
      )
    );
  };

  const updateAttribute = (attribute, newValue) => {
    if (currFunction) {
      setFunctions((prevFunctions) => ({
        ...prevFunctions,
        [currFunction]: {
          ...prevFunctions[currFunction],
          [attribute]: newValue,
        },
      }));
    }
  };

  const updateNestedAttribute = (
    attribute,
    nestedAttribute,
    nestedNestedAttribute,
    newValue
  ) => {
    if (currFunction) {
      setFunctions((prevFunctions) => ({
        ...prevFunctions,
        [currFunction]: {
          ...prevFunctions[currFunction],
          [attribute]: {
            ...prevFunctions[currFunction][attribute],
            [nestedAttribute]: {
              ...prevFunctions[currFunction][attribute][nestedAttribute],
              [nestedNestedAttribute]: newValue,
            },
          },
        },
      }));
    }
  };


  const generateFinalFunction = () => {
    let allFinalFunction = "namespace " + namespace + "{\n";
    let groupSet = new Set();

    Object.keys(functions).forEach((key) => {
      let currGroup = functions[key].group;
      if (currGroup) {
        groupSet.add(currGroup);
      }
      allFinalFunction += generateCodeForFunction(functions[key])+ "\n\n"
    });
    allFinalFunction += "}";


    setFinalFunction(
      "//% groups='[" +
        Array.from(groupSet)
          .map((item) => `"${item}"`)
          .join(", ") +
        "]'\n" +
        allFinalFunction
    );
  };

  return (
    <div
        className="main-main-content"
    >
      <SplitPane
        split="vertical"
        sizes={sizes}
        onChange={setSizes}
        resizerSize={5}
        className="try"
      >
        <Pane minSize="10%" maxSize="70%" className="split-pane-container">
            <FunctionContainer
              functions={functions}
              currFunction={currFunction}
              setFunctions={setFunctions}
              setCurrFunction={setCurrFunction}
              namespace={namespace}
              setNamespace={setNamespace}
            />
        </Pane>
        <Pane minSize="10%" maxSize="70%" div className="split-pane-container code-container">
            {functions[currFunction] ? (
              <CodeEditor
                firstCode={functions[currFunction].code}
                usedLanguagechange={"javascript"}
                changeCode={updateFunctionCode}
              />
            ) : (
              <div>Please select a function!</div>
            )}
        </Pane>
        <Pane minSize="10%" maxSize="70%" className="split-pane-container">
            {functions[currFunction] ? (
              <NewOptionPane
                updateAttribute={updateAttribute}
                updateNestedAttribute={updateNestedAttribute}
                optionPaneFunction={functions[currFunction]}
              />
            ) : (
              <div>Please add/select a function!</div>
            )}
        </Pane>
        <Pane minSize="1%" maxSize="70%" className="split-pane-container generate-container">
            <GenerateButton onClick={generateFinalFunction} />
        </Pane>

        <Pane minSize="5%" maxSize="70%" className="split-pane-container code-container">
            <DownloadCodeEditor
              firstCode={finalFunction}
              usedLanguage="javascript"
            />
        </Pane>
      </SplitPane>
    </div>
  );
};

export default Multiple;
