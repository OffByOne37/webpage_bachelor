import React, { useState } from "react";
import SplitPane, { Pane } from "split-pane-react";

import "split-pane-react/esm/themes/default.css";
import "./css/Multiple.css";
import "./css/MainContent.css";

import CodeEditor from "./components/CodeEditor";
import DownloadCodeEditor from "./components/DownloadCodeEditor";
import FunctionContainer from "./components/FunctionContainer";
import NewOptionPane from "./components/NewOptionPane";
import GenerateButton from "./components/GenerateButton";
import { generateCodeForFunction } from "./generateFunctionFile";
import { updateCodeAndParameter } from "./updateCodeAndParameter";

const Multiple = () => {
  const [finalFunction, setFinalFunction] = useState(
    "//Your Code will be displayed here after generation"
  );
  const [currFunction, setCurrFunction] = useState(null);
  const [functions, setFunctions] = useState({});
  const [namespace, setNamespace] = useState("not_defined");

  const [sizes, setSizes] = useState(["20%", "40%", "22%", "3%", "15%"]);

  const updateFunctionCode = (code) => {
    updateCodeAndParameter(updateAttribute, code, functions[currFunction])
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
      allFinalFunction += generateCodeForFunction(functions[key]) + "\n\n";
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
    <div className="main-main-content">
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
        <Pane
          minSize="10%"
          maxSize="70%"
          div
          className="split-pane-container code-container"
        >
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
        <Pane
          minSize="1%"
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

export default Multiple;
