import React, { useState } from "react";
import SplitPane, { Pane } from "split-pane-react";
import "split-pane-react/esm/themes/default.css";
import "../App.css";
import AdjustableCodeEditor from "../components/AdjustableCodeEditor";
import CodeEditor from "../components/CodeEditor";
import DownloadCodeEditor from "../components/DownloadCodeEditor";
import FunctionContainer from "../components/FunctionContainer";
import NewOptionPane from "../components/NewOptionPane";

const Multiple = () => {
  const [currFunction, setCurrFunction] = useState(null);
  const [functions, setFunctions] = useState({});

  const [sizes, setSizes] = useState(["20%", "40%", "20%", "20%"]);
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
      updateAttribute("currParameter", []);
      return;
    }

    const parameters = match[1].match(ARGUMENT_NAMES);
    if (parameters === null) {
      updateAttribute("currParameter", []);
      return;
    }

    const result = parameters.map((param) => {
      const [name, type] = param.split(":").map((item) => item.trim());
      return { name, type: type || undefined };
    });

    updateAttribute("currParameter", result);

    const generateUpdatedParameters = (prevParameters, type) => {
      return result
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

  function addBlockIDToPythonFunction(
    functionName,
    blockID,
    inline,
    advanced,
    currFunctionName,
    languages,
    numberParameter,
    expandable,
    ownArrayParameter,
    booleanParameter
  ) {
    const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm;
    let functionToWork = functions[functionName].code
      .replace(STRIP_COMMENTS, "")
      .trim();
    functionToWork = functionToWork.startsWith("export")
      ? functionToWork
      : "export " + functionToWork;
    if (blockID === "") {
    } else {
      const blockSnippet = `//% blockID=${blockID}\n`;
      functionToWork = blockSnippet + functionToWork;
    }

    functionToWork =
      "//% inlineInputMode=" +
      (inline ? " internal" : " external") +
      "\n" +
      functionToWork;

    if (advanced) {
      functionToWork = "//% advanced=true\n" + functionToWork;
    }
    languages.map(
      (lang) =>
        (functionToWork =
          "//% block.loc." +
          lang.code +
          '="' +
          lang.text +
          '"\n' +
          functionToWork)
    );

    numberParameter
      .filter(
        (x) =>
          x.min !== undefined ||
          x.max !== undefined ||
          x.def !== undefined ||
          x.editorField !== undefined ||
          x.shadow !== undefined
      )
      .map(
        (x) =>
          (functionToWork =
            (x.min === undefined
              ? ""
              : "//% " + x.name + ".min=" + x.min + " \n") +
            (x.max === undefined
              ? ""
              : "//% " + x.name + ".max=" + x.max + " \n") +
            (x.def === undefined
              ? ""
              : "//% " + x.name + ".defl=" + x.def + " \n") +
            (x.editorField !== undefined
              ? "//% " + x.name + '.fieldEditor="' + x.editorField + '"\n'
              : "") +
            (x.shadow !== undefined
              ? "//% " + x.name + '.shadow="' + x.shadow + '"\n'
              : "") +
            functionToWork)
      );

    booleanParameter.map(
      (x) =>
        (functionToWork =
          (x.shadow !== undefined
            ? "//% " + x.name + '.shadow="' + x.shadow + '"\n'
            : "") +
          (x.def !== undefined
            ? "//% " + x.name + ".defl=" + x.def + "\n"
            : "") +
          functionToWork)
    );

    if (expandable !== "null") {
      functionToWork =
        '//% expandableArgumentMode="' + [expandable] + '"\n' + functionToWork;
    }

    ownArrayParameter.forEach((element) => {
      if (element.defaulValue !== null) {
        functionToWork =
          "//% " +
          element.name +
          ".defl=" +
          element.defaultValue +
          "\n" +
          functionToWork;
      }
    });

    functionToWork = '//% block="' + currFunctionName + '"\n' + functionToWork;

    updateAttribute("finalFunction", functionToWork);
  }

  return (
    <div
      style={{
        position: "absolute",
        top: "56px",
        bottom: "118px",
        width: "100%",
        overflowY: "scroll",
        wordBreak: "break-word",
      }}
    >
      <SplitPane
        split="vertical"
        sizes={sizes}
        onChange={setSizes}
        resizerSize={4}
        className="try"
      >
        <Pane minSize="10%" maxSize="70%">
          <div style={{ ...layoutCSS, background: "#d5d7d9" }}>
            <FunctionContainer
              functions={functions}
              currFunction={currFunction}
              setFunctions={setFunctions}
              setCurrFunction={setCurrFunction}
            />
          </div>
        </Pane>
        <Pane minSize="20%" maxSize="70%">
          <div style={{ ...layoutCSS }}>
            {functions[currFunction] ? (
              <CodeEditor
                firstCode={functions[currFunction].code}
                usedLanguagechange={"javascript"}
                changeCode={updateFunctionCode}
              />
            ) : (
              <div>Please select a function!</div>
            )}
          </div>
        </Pane>
        <Pane minSize="10%" maxSize="50%">
          <div style={{ ...layoutCSS, background: "#d5d7d9" }}>
            {functions[currFunction] ? (
              <NewOptionPane
              updateAttribute={updateAttribute}
              optionPaneFunction={functions[currFunction]}
            />
            ) : (
              <div>Please add/select a function!</div>
            )}
          </div>
        </Pane>
        <Pane minSize="5%" maxSize="70%">
          <div style={{ ...layoutCSS }}>
            <DownloadCodeEditor
              firstCode="//Your Code will be displayed here after generation"
              usedLanguage="python"
            />{" "}
            {/*TODO: change this depending on conversion*/}
          </div>
        </Pane>
      </SplitPane>
    </div>
  );
};

export default Multiple;
