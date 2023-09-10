import React, { useEffect, useState } from "react";
import SplitPane, { Pane } from "split-pane-react";
import "split-pane-react/esm/themes/default.css";
import "../css/App.css";
import "./css/MainContent.css";
import CodeEditor from "./components/CodeEditor";
import DownloadCodeEditor from "./components/DownloadCodeEditor";
import EnumOptionPane from "./components/EnumOptionPane";
import GenerateButton from "./components/GenerateButton";

const EnumPage = () => {
  const [sizes, setSizes] = useState(["55%", "5%", "40%"]);
  const [enumName, setEnumName] = useState("myEnum");
  const [enumValues, setEnumValues] = useState({});

  const [currFunction, setFunction] = useState("//Your code");
  const [finalFunction, setFinalFunction] = useState(
    "//Your code will be displayed here"
  );

  const generateFinalEnum = () => {
    let finalValue = `enum ${enumName.trim().replace(/\s+/g, "")}{\n`;

    Object.keys(enumValues).forEach((enumValueName) => {
      const entry = enumValues[enumValueName];

      // Add blockId if it exists
      if (entry.enumId !== undefined) {
        finalValue += `  //% blockId="${entry.enumId}"\n`;
      }

      finalValue += `  //% block="${entry.visibleName}"\n`;

      // Add codeName or visibleName (without whitespace) and a comma with a new line
      if (entry.codeName !== undefined) {
        finalValue += `  ${entry.codeName}`;
      } else if (entry.visibleName !== undefined) {
        const cleanedVisibleName = entry.visibleName.replace(/\s+/g, "");
        finalValue += `  ${cleanedVisibleName}`;
      }

      // Add initializer if it exists
      if (entry.initializer !== undefined) {
        finalValue += ` = ${entry.initializer},\n`;
      } else {
        finalValue += `,\n`;
      }
    });

    finalValue += "}\n";
    setFinalFunction(finalValue);
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
        <Pane minSize="10%" maxSize="90%">
          <EnumOptionPane
            enumName={enumName}
            setEnumName={setEnumName}
            enumValues={enumValues}
            setEnumValues={setEnumValues}
          />
        </Pane>
        <Pane
          minSize="1%"
          maxSize="70%"
          className="split-pane-container generate-container"
        >
          <GenerateButton onClick={generateFinalEnum} />
        </Pane>
        <Pane minSize="10%" maxSize="90%">
          <DownloadCodeEditor
            firstCode={finalFunction}
            usedLanguage="javascript"
          />
        </Pane>
      </SplitPane>
    </div>
  );
};

export default EnumPage;
