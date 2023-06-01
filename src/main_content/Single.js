import React, { useState } from "react";
import SplitPane, { Pane } from 'split-pane-react';
import 'split-pane-react/esm/themes/default.css'
import '../App.css'
import AdjustableCodeEditor from "../components/AdjustableCodeEditor";
import DownloadCodeEditor from "../components/DownloadCodeEditor";

const Single = () => {
    const [sizes, setSizes] = useState([
        '40%',
        '30%',
        '30%',
    ]);

    const layoutCSS = {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: "0px",
    };

    return (
        <div style={{position:"absolute", top:"56px", bottom:"118px", width:"100%", overflowY:"scroll", wordBreak:"break-word"}}>
        <SplitPane
            split='vertical'
            sizes={sizes}
            onChange={setSizes}
            resizerSize={4}
            className="try"
        >
            <Pane minSize="30%" maxSize='70%'>
                <div style={{ ...layoutCSS, background: '#ddd' }}>
                    <AdjustableCodeEditor firstCode="//Please enter your Code here"/>
                </div>
            </Pane >
            <Pane minSize="10%" maxSize='50%'>
                <div style={{ ...layoutCSS, background: '#d5d7d9' }}>
                    pane2
                </div>
            </Pane>
            <Pane minSize="5%" maxSize='70%'>
                <div style={{ ...layoutCSS, background: '#a1a5a9' }}>
                    <DownloadCodeEditor firstCode="//Your Code will be displayed here after generation" usedLanguage="python"/> {/*TODO: change this depending on conversion*/}
                </div>
            </Pane>
        </SplitPane>
        </div>
    )
}

export default Single;