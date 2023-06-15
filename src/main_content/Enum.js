import React, { useState, useEffect } from "react";
import SplitPane, { Pane } from "split-pane-react";
import "split-pane-react/esm/themes/default.css";
import "../App.css";
import DownloadCodeEditor from "../components/DownloadCodeEditor";
import CodeEditor from "../components/CodeEditor";
import EnumOptionPane from "../components/EnumOptionPane";

const EnumPage = () => {
  const [sizes, setSizes] = useState(["40%", "30%", "30%"]);
  const [enumName, setEnumName] = useState(undefined);

  const [currFunction, setFunction] = useState("//Your code");
  const [finalFunction, setFinalFunction] = useState(
    "//Your code will be displayed here"
  );
  const [enumValues, setEnumValues] = useState(new Set());

  const layoutCSS = {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: "0px",
  };

  useEffect(() => {
    function getEnumInfo(code) {
      const enumPattern = /enum\s+(\w+)\s*{([^}]*)}/;
      const match = enumPattern.exec(code);
  
      if (match) {
        const [, enumName, values] = match;
        const valuesArray = values
          .split(",")
          .map((value) => value.trim())
          .filter((value) => value.length > 0);
  
        const uniqueValues = new Set(valuesArray);
        return { enumName, valuesSet:uniqueValues };
      }
  
      return { enumName: undefined, valuesSet: [] };
    }
  
    const extractedValues = getEnumInfo(currFunction);
    const currValues = Array.from(extractedValues.valuesSet);
  
    // Remove values that are not present in the current code
    const filteredEnumValues = Array.from(enumValues).filter(
      (value) => currValues.some((v) => v === value.enumValue)
    );
  
    // Add new values that are not already present in enumValues
    currValues.forEach((value) => {
      const found = filteredEnumValues.some((v) => v.enumValue === value);
      if (!found) {
        filteredEnumValues.push({ enumValue: value, enumShowName: undefined });
      }
    });
  
    setEnumValues(filteredEnumValues);
    setEnumName(extractedValues.enumName);
  }, [currFunction, enumValues]);
  

  const generateFinalEnum = () => {
    // Generate the final enum code based on the enumValues
  };

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
        <Pane minSize="30%" maxSize="70%">
          <div style={{ ...layoutCSS, background: "#ddd" }}>
            <CodeEditor
              firstCode={currFunction}
              usedLanguagechange={"javascript"}
              changeCode={setFunction}
            />
          </div>
        </Pane>
        <Pane minSize="10%" maxSize="50%">
          <div style={{ ...layoutCSS, background: "#d5d7d9" }}>
            <EnumOptionPane
              generateFinalEnum={generateFinalEnum}
              currEnumValues={enumValues}/>
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

export default EnumPage;
