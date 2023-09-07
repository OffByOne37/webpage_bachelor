import isEqual from "lodash/isEqual";
import React, { useState } from "react";
import SplitPane, { Pane } from "split-pane-react";
import "split-pane-react/esm/themes/default.css";
import '../css/App.css';
import CodeEditor from "./components/CodeEditor";
import DownloadCodeEditor from "./components/DownloadCodeEditor";
import NewOptionPane from "./components/NewOptionPane";
import './css/MainContent.css'
import { generateFinalFunction } from "./generateFunctionFile";

const NewSingle = () => {
  const [sizes, setSizes] = useState(["30%", "30%", "10", "30%"]);
  const [currFunction, setCurrFunction] = useState({
    code: "// Please add your code here!",
    blockIdRequired: false,
    blockId: "",
    inline: false,
    advanced: false,
    currFunctionName: "function",
    languages: [],
    numberParameter: [],
    ownArrayParameter: [],
    booleanParameter: [],
    expandable: "null",
    duplicateNames: false,
    currParameter: [],
    finalFunction: "",
    group: undefined,
  });
  const [finalFunction, setFinalFunction] = useState(
    "//Your codddde will be displayed here"
  );

  const layoutCSS = {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: "0px",
  };

  const updateFunctionCode = (code) => {
    updateAttribute("code", code);

    const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm;
    const ARGUMENT_NAMES = /([^\s,]+(?:\s+[^\s,]+)*)/g;

    const fnStr = code.replace(STRIP_COMMENTS, "");
    const match = fnStr.match(/function\s*\w*\s*\(([^)]*)\)/);
    if (match === null || match.length < 2) {
      if (currFunction.currParameter.length !== 0) {
        updateAttribute("currParameter", []);
      }
      return;
    }

    const parameters = match[1].match(ARGUMENT_NAMES);
    if (parameters === null) {
      if (currFunction.currParameter.length !== 0) {
        updateAttribute("currParameter", []);
      }
      return;
    }

    const result = parameters.map((param) => {
      const [name, type] = param.split(":").map((item) => item.trim());
      return { name, type: type || undefined };
    });

    if (!isEqual(currFunction.currParameter, result)) {
      updateAttribute("currParameter", result);
      console.log(result);

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
        generateUpdatedParameters(currFunction.numberParameter, "number")
      );
      updateAttribute(
        "booleanParameter",
        generateUpdatedParameters(currFunction.booleanParameter, "boolean")
      );
    }
  };

  const updateAttribute = (attribute, newValue) => {
    if (currFunction) {
      setCurrFunction((prevFunction) => ({
        ...prevFunction,
        [attribute]: newValue,
      }));
    }
  };

  function addBlockIDToPythonFunction() {
    setFinalFunction(generateFinalFunction(currFunction));
  }

  const updateNestedAttribute = (
    attribute,
    nestedAttribute,
    nestedNestedAttribute,
    newValue
  ) => {
    if (currFunction) {
      setCurrFunction((prevFunction) => ({
        ...prevFunction,
        [attribute]: {
          ...prevFunction[attribute],
          [nestedAttribute]: {
            ...prevFunction[attribute][nestedAttribute],
            [nestedNestedAttribute]: newValue,
          },
        },
      }));
    }
  };

  return (
    <div
      className="main-main-content"
    >
      <SplitPane
        split="vertical"
        sizes={sizes}
        onChange={setSizes}
        resizerSize={4}
        className="try"
      >
        <Pane minSize="30%" maxSize="70%">
          <div style={{ ...layoutCSS, background: "#ddd" }}>
            <CodeEditor
              firstCode={currFunction.code}
              usedLanguagechange={"javascript"}
              changeCode={updateFunctionCode}
            />
          </div>
        </Pane>
        <Pane minSize="10%" maxSize="50%">
          <div style={{ ...layoutCSS, background: "#d5d7d9" }}>
            <NewOptionPane
              updateAttribute={updateAttribute}
              updateNestedAttribute={updateNestedAttribute}
              optionPaneFunction={currFunction}
            />
          </div>
        </Pane>
        <Pane minSize="5%" maxSize="5%">
          <div style={{ ...layoutCSS }}>
            <button
              style={{
                padding: "10px 20px",
                fontSize: "16px",
                backgroundColor: "#007bff", // Blue color
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                transition: "background-color 0.3s, transform 0.2s",
              }}
              onClick={addBlockIDToPythonFunction}
            >
              Generate
            </button>
          </div>
        </Pane>
        <Pane minSize="5%" maxSize="70%">
          <div style={{ ...layoutCSS, background: "#a1a5a9" }}>
            <DownloadCodeEditor
              firstCode={finalFunction}
              usedLanguage="javascript"
            />
          </div>
        </Pane>
      </SplitPane>
    </div>
  );
};

export default NewSingle;
