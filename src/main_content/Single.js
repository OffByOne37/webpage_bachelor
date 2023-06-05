import React, { useState } from "react";
import SplitPane, { Pane } from 'split-pane-react';
import 'split-pane-react/esm/themes/default.css'
import '../App.css'
import DownloadCodeEditor from "../components/DownloadCodeEditor";
import OptionPane from "../components/OptionPane";
import CodeEditor from "../components/CodeEditor";

const Single = () => {
    const [sizes, setSizes] = useState([
        '40%',
        '30%',
        '30%',
    ]);
    const [currFunction, setFunction] = useState("//Please enter your function here");
    const [finalFunction, setFinalFunction] = useState("//Your codddde will be displayed here");

    const layoutCSS = {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: "0px",
    };


    function addBlockIDToPythonFunction(blockID, inline, advanced) {
        let functionToWork = currFunction;
        if (blockID === "") {
        } else {
            const blockSnippet = `//% blockID=${blockID}\n`;
            functionToWork = blockSnippet + functionToWork;
        }

        functionToWork = "//% inlineInputMode=" + (inline ? " internal" : " external") + "\n" + functionToWork;

        if (advanced) {
            functionToWork = "//% advanced=true\n" + functionToWork;
        }
        functionToWork = "//% block\n" + functionToWork;
        setFinalFunction(functionToWork);
    };

    return (
        <div style={{ position: "absolute", top: "56px", bottom: "118px", width: "100%", overflowY: "scroll", wordBreak: "break-word" }}>
            <SplitPane
                split='vertical'
                sizes={sizes}
                onChange={setSizes}
                resizerSize={4}
                className="try"
            >
                <Pane minSize="30%" maxSize='70%'>
                    <div style={{ ...layoutCSS, background: '#ddd' }}>
                        <CodeEditor firstCode={currFunction} usedLanguagechange={"javascript"} changeCode={setFunction} />
                    </div>
                </Pane >
                <Pane minSize="10%" maxSize='50%'>
                    <div style={{ ...layoutCSS, background: '#d5d7d9' }}>
                        <OptionPane generateFunction={addBlockIDToPythonFunction} />
                    </div>
                </Pane>
                <Pane minSize="5%" maxSize='70%'>
                    <div style={{ ...layoutCSS, background: '#a1a5a9' }}>
                        <DownloadCodeEditor firstCode={finalFunction} usedLanguage="javascript" />
                    </div>
                </Pane>
            </SplitPane>
        </div>
    )
}

export default Single;