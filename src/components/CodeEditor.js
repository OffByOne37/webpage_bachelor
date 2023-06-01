import React, { useState } from 'react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/themes/prism-okaidia.css';
import "prismjs/components/prism-clike";
import "prismjs/components/prism-python";
import "prismjs/components/prism-javascript";
import './editor.css';

const CodeEditor = ({ firstCode, usedLanguage}) => {
  const [code, setCode] = useState(firstCode);


  let lang = usedLanguage === 'python' ? Prism.languages.python : Prism.languages.javascript;
  return (
    <div className='window'>
      <Editor
        value={code}
        onValueChange={code => setCode(code)}
        highlight={code => Prism.highlight(code, lang, usedLanguage)}
        padding={10}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 12,
        }}
      />
    </div>
  );
}

export default CodeEditor;
