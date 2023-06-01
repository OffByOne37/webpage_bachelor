import React, { useState } from 'react';
import Editor from 'react-simple-code-editor';

import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';

import './prism-vsc-dark-plus.css';
import './editor.css';


const CodeEditor = ({firstCode}) => {

  const [code, setCode] = useState(firstCode);

  return (
    <div className='window'>

      <Editor
        value={code}
        onValueChange={code => setCode(code)}
        highlight={code => highlight(code, languages.js)}
        padding={10}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 12
        }}
      />

    </div>

  );
}

export default CodeEditor;