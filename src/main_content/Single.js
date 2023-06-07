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
    const [currParameters, setCurrParameters] = useState([]);

    const layoutCSS = {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: "0px",
    };
    const extractParameters = () => {
        const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
        const ARGUMENT_NAMES = /([^\s,]+(?:\s+[^\s,]+)*)/g;

        const fnStr = currFunction.toString().replace(STRIP_COMMENTS, '');
        const parameters = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
        if (parameters === null) {
            setCurrParameters([]);
            return;
        }

        const result = parameters.map(param => {
            const [name, type] = param.split(':').map(item => item.trim());
            return { name, type: type || 'undefined' };
        });

        setCurrParameters(result);
    };


    function addBlockIDToPythonFunction(blockID, inline, advanced, currFunctionName, languages, numberParameter, expandable, ownArrayParameter) {
        const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
        let functionToWork = currFunction.replace(STRIP_COMMENTS, '').trim();
        functionToWork = functionToWork.startsWith("export") ? functionToWork : "export " + functionToWork;
        if (blockID === "") {
        } else {
            const blockSnippet = `//% blockID=${blockID}\n`;
            functionToWork = blockSnippet + functionToWork;
        }

        functionToWork = "//% inlineInputMode=" + (inline ? " internal" : " external") + "\n" + functionToWork;

        if (advanced) {
            functionToWork = "//% advanced=true\n" + functionToWork;
        }
        languages.map((lang) => functionToWork = "//% block.loc." + lang.code + "=\"" + lang.text + "\"\n" + functionToWork)
        numberParameter.filter(x => x.min !== "undefined" || x.max !== "undefined" || x.def !== "undefined").map(x => functionToWork = "//% " + (x.min === "undefined" ? "" : x.name + ".min=" + x.min + " ") + (x.max === "undefined" ? "" : x.name + ".max=" + x.max + " ") + (x.def === "undefined" ? "" : x.name + ".defl=" + x.def + " ") + "\n" + functionToWork)
        if (expandable !== "null") {
            functionToWork = "//% expandableArgumentMode=\"" + [expandable] + "\"\n" + functionToWork;
        }

        ownArrayParameter.map((param) => {if(param.defaulValue!==null){functionToWork= "//% "+param.name +".defl="+param.defaultValue+"\n" + functionToWork}})

        functionToWork = "//% block=\"" + currFunctionName + "\"\n" + functionToWork;

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
                        <OptionPane generateFunction={addBlockIDToPythonFunction} refreshParameters={extractParameters} currParameters={currParameters} />
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