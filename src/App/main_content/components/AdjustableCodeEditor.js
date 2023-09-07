//This could could be used in case you want to change the language, but I choose to not use this option



// import React, { useState } from 'react';
// import CodeEditor from './CodeEditor';
// import './editor.css';


// const AdjustableCodeEditor = ({ firstCode , changeCode}) => {
//   const [language, setLanguage] = useState('python');

//   const handleLanguageChange = (event) => {
//     const selectedLanguage = event.target.value;
//     setLanguage(selectedLanguage);
//   };

//   return (
//     <>
//       <div className='language-dropdown'>
//         <select value={language} onChange={handleLanguageChange}>
//           <option value='python'>Python</option>
//           <option value='javascript'>JavaScript</option>
//         </select>
//         <div className="custom-select-arrow"></div>
//       </div>
//       <CodeEditor firstCode={firstCode} usedLanguage={language} changeCode={changeCode} />
//     </>
//   );
// };

// export default AdjustableCodeEditor;
