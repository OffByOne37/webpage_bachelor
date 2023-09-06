import Prism from 'prismjs';
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-python";
import 'prismjs/themes/prism-okaidia.css';
import React from 'react';
import Editor from 'react-simple-code-editor';
import './editor.css';

const CodeEditor = ({ firstCode, usedLanguage, changeCode}) => {


  let lang = usedLanguage === 'python' ? Prism.languages.python : Prism.languages.javascript;
  return (
    <div className='window'>
      <Editor
        value={firstCode}
        onValueChange={firstCode => changeCode(firstCode)}
        highlight={code => Prism.highlight(firstCode, lang, usedLanguage)}
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
