import React, { useState } from "react";
import SplitPane, { Pane } from "split-pane-react";

import "split-pane-react/esm/themes/default.css";
import "./css/Multiple.css"
import "./css/MainContent.css"


import CodeEditor from "./components/CodeEditor";
import DownloadCodeEditor from "./components/DownloadCodeEditor";
import FunctionContainer from "./components/FunctionContainer";
import NewOptionPane from "./components/NewOptionPane";
import GenerateButton from "./components/GenerateButton";

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

  function addBlockIDToPythonFunction(functionName) {
    const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm;
    let functionToWork = functions[functionName].code
      .replace(STRIP_COMMENTS, "")
      .trim();
    functionToWork = functionToWork.startsWith("export")
      ? functionToWork
      : "export " + functionToWork;
    if (functions[functionName].group !== undefined) {
      functionToWork =
        "//% group='" + functions[functionName].group + "'\n" + functionToWork;
    }
    if (functions[functionName].blockId === "") {
    } else {
      const blockSnippet = `//% blockID=${functions[functionName].blockId}\n`;
      functionToWork = blockSnippet + functionToWork;
    }

    functionToWork =
      "//% inlineInputMode=" +
      (functions[functionName].inline ? " internal" : " external") +
      "\n" +
      functionToWork;

    if (functions[functionName].advanced) {
      functionToWork = "//% advanced=true\n" + functionToWork;
    }
    functions[functionName].languages.map(
      (lang) =>
        (functionToWork =
          "//% block.loc." +
          lang.code +
          '="' +
          lang.text +
          '"\n' +
          functionToWork)
    );

    for (const paramName in functions[functionName].numberParameter) {
      const x = functions[functionName].numberParameter[paramName];
      let parameterString = "";

      if (
        x.min !== undefined ||
        x.max !== undefined ||
        x.def !== undefined ||
        x.editorField !== undefined ||
        x.shadow !== undefined
      ) {
        parameterString +=
          (x.min === undefined
            ? ""
            : "//% " + paramName + ".min=" + x.min + " \n") +
          (x.max === undefined
            ? ""
            : "//% " + paramName + ".max=" + x.max + " \n") +
          (x.def === undefined
            ? ""
            : "//% " + paramName + ".defl=" + x.def + " \n") +
          (x.editorField !== undefined
            ? "//% " + paramName + '.fieldEditor="' + x.editorField + '"\n'
            : "") +
          (x.shadow !== undefined
            ? "asdfasdf//% " + paramName + '.shadow="' + x.shadow + '"\n'
            : "");
      }

      functionToWork = parameterString + functionToWork;
    }

    for (const paramName in functions[functionName].booleanParameter) {
      const x = functions[functionName].booleanParameter[paramName];
      let parameterString = "";

      if (x.shadow !== undefined || x.def !== undefined) {
        parameterString +=
          (x.shadow !== undefined
            ? "//% " + paramName + '.shadow="' + x.shadow + '"\n'
            : "") +
          (x.def !== undefined
            ? "//% " + paramName + ".defl=" + x.def + "\n"
            : "");
      }

      functionToWork += parameterString;
    }

    // Now you can use the updated functionToWork

    if (functions[functionName].expandable !== "null") {
      functionToWork =
        '//% expandableArgumentMode="' +
        [functions[functionName].expandable] +
        '"\n' +
        functionToWork;
    }

    functions[functionName].ownArrayParameter.forEach((element) => {
      if (element.def !== null) {
        functionToWork =
          "//% " +
          element.name +
          ".defl=" +
          element.def +
          "\n" +
          functionToWork;
      }
    });

    functionToWork =
      '//% block="' +
      functions[functionName].currFunctionName +
      '"\n' +
      functionToWork;

    updateAttribute("finalFunction", functionToWork);
    return functionToWork;
  }

  const generateFinalFunction = () => {
    let allFinalFunction = "namespace " + namespace + "{\n";
    let groupSet = new Set();

    Object.keys(functions).forEach((key) => {
      let currGroup = functions[key].group;
      if (currGroup) {
        groupSet.add(currGroup);
      }
      allFinalFunction += addBlockIDToPythonFunction(key) + "\n\n";
    });
    allFinalFunction += "}";

    console.log(groupSet);

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
