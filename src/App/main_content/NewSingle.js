import React, { useState } from "react";
import SplitPane, { Pane } from "split-pane-react";
import "split-pane-react/esm/themes/default.css";
import "../css/App.css";
import CodeEditor from "./components/CodeEditor";
import DownloadCodeEditor from "./components/DownloadCodeEditor";
import NewOptionPane from "./components/NewOptionPane";
import "./css/MainContent.css";
import "./css/Multiple.css";
import { generateCodeForFunction } from "./helper/generateFunctionFile";
import { updateCodeAndParameter } from "./helper/updateCodeAndParameter";
import GenerateButton from "./components/GenerateButton";

const defaultFunction = {
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
  expandable: undefined,
  duplicateNames: false,
  currParameter: [],
  finalFunction: "",
  group: undefined,
};

const NewSingle = () => {
  const [sizes, setSizes] = useState(["42%", "35%", "3", "20%"]);
  const [currFunction, setCurrFunction] = useState(defaultFunction);
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

  function generateFinalFunction() {
    let returnVal = generateCodeForFunction(currFunction);
    if(returnVal){
      setFinalFunction(returnVal);
    }
    
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
          minSize="3%"
          maxSize="70%"
          className="split-pane-container generate-container"
        >
          <GenerateButton onClick={generateFinalFunction} />
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
