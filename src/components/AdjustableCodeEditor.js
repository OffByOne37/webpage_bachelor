import React, { useState } from 'react';
import CodeEditor from './CodeEditor';
import './editor.css';


const AdjustableCodeEditor = ({ firstCode }) => {
  const [language, setLanguage] = useState('python');

  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    setLanguage(selectedLanguage);
  };

  return (
    <>
      <div className='language-dropdown'>
        <select value={language} onChange={handleLanguageChange}>
          <option value='python'>Python</option>
          <option value='javascript'>JavaScript</option>
        </select>
        <div className="custom-select-arrow"></div>
      </div>
      <CodeEditor firstCode={firstCode} usedLanguage={language} />
    </>
  );
};

export default AdjustableCodeEditor;
