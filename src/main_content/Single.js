import CodeEditor from "../components/CodeEditor";
import React, { useState } from "react";
import SplitPane, { Pane } from 'split-pane-react';
import 'split-pane-react/esm/themes/default.css'
import '../App.css'

const Single = () => {
    const [sizes, setSizes] = useState([
        '40%',
        '30%',
        '30%',
    ]);

    const layoutCSS = {
        height: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: "0px",
    };

    return (
        <SplitPane
            split='vertical'
            sizes={sizes}
            onChange={setSizes}
            resizerSize={4}
            className="try"
            
        >
            <Pane minSize="30%" maxSize='70%'>
                <div style={{ ...layoutCSS, background: '#ddd' }}>
                    <CodeEditor firstCode="//Please enter your Code here"/>
                </div>
            </Pane >
            <Pane minSize="10%" maxSize='50%'>
                <div style={{ ...layoutCSS, background: '#d5d7d9' }}>
                    pane2
                </div>
            </Pane>
            <Pane minSize="5%" maxSize='70%'>
                <div style={{ ...layoutCSS, background: '#a1a5a9' }}>
                    <CodeEditor firstCode="//Your Code will be displayed here after generation"/>
                </div>
            </Pane>
        </SplitPane>
    )
}

export default Single;