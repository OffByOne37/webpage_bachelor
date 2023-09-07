import isEqual from "lodash/isEqual";
import React, { useState } from "react";
import SplitPane, { Pane } from "split-pane-react";
import "split-pane-react/esm/themes/default.css";
import "../css/App.css";
import CodeEditor from "./components/CodeEditor";
import DownloadCodeEditor from "./components/DownloadCodeEditor";
import NewOptionPane from "./components/NewOptionPane";
import "./css/MainContent.css";
import "./css/Multiple.css";
import { generateCodeForFunction } from "./generateFunctionFile";
import {
  getNewParameter,
  getNewTypeParameters,
} from "./components/getNewParameterFile";
import { updateCodeAndParameter } from "./updateCodeAndParameter";

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

  const updateFunctionCode = (code) => {
    updateCodeAndParameter(updateAttribute, code, currFunction);
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
    setFinalFunction(generateCodeForFunction(currFunction));
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
    <div className="main-main-content">
      <SplitPane
        split="vertical"
        sizes={sizes}
        onChange={setSizes}
        resizerSize={4}
        className="try"
      >
        <Pane
          minSize="30%"
          maxSize="70%"
          className="split-pane-container code-container"
        >
          <CodeEditor
            firstCode={currFunction.code}
            usedLanguagechange={"javascript"}
            changeCode={updateFunctionCode}
          />
        </Pane>
        <Pane minSize="10%" maxSize="50%" className="split-pane-container">
          <NewOptionPane
            updateAttribute={updateAttribute}
            updateNestedAttribute={updateNestedAttribute}
            optionPaneFunction={currFunction}
          />
        </Pane>
        <Pane
          minSize="5%"
          maxSize="5%"
          className="split-pane-container generate-container"
        >
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
        </Pane>
        <Pane
          minSize="5%"
          maxSize="70%"
          className="split-pane-container code-container"
        >
          <DownloadCodeEditor
            firstCode={finalFunction}
            usedLanguage="javascript"
          />
        </Pane>
      </SplitPane>
    </div>
  );
};

export default NewSingle;
