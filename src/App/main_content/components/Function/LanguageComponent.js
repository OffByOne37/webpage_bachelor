import React, { useState } from "react";

const LanguageComponent = ({languages, currFunctionName, setLanguages}) => {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  let mostCommonEuropeanLanguages = [
    "en",
    "de",
    "fr",
    "es",
    "it",
    "pt",
    "ru",
    "nl",
    "pl",
    "sv",
  ];

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleLanguageSelection = (langCode) => {
    setSelectedLanguage({code: langCode, text:currFunctionName});
    togglePopup();
  };

  const handleTextChange = (e) => {
    setSelectedLanguage((prevLang) => ({ code: prevLang.code, text: e.target.value }));
  };
  

  const handleDeleteLanguage = (code) => {
    setLanguages(languages.filter((lang) => lang.code !== code));
  };

  const handleAddLanguage = () => {
    const existingLanguage = languages.find((lang) => lang.code === selectedLanguage.code);
    
    if (existingLanguage) {
      const updatedLanguages = languages.map((lang) =>
        lang.code === selectedLanguage.code ? { code: selectedLanguage.code, text: selectedLanguage.text } : lang
      );
    
      setLanguages(updatedLanguages);
    } else {
      setLanguages([...languages, selectedLanguage]);
    }
    
    setSelectedLanguage(null);
  };

  
  

  return (
    <>
      <button onClick={togglePopup}>Add Language</button>
      <div
        style={{
          width: "100%",
          justifyContent: "left",
          alignContent: "left",
          textAlign: "left",
        }}
      >
        {showPopup && (
          <div>
            <h7>Select a Language</h7>
            <ul
              style={{
                display: "flex",
                flexWrap: "wrap",
                listStyle: "none",
                padding: 0,
              }}
            >
              {mostCommonEuropeanLanguages.map((lang) => (
                <li
                  key={lang}
                  style={{ marginRight: "6px", marginBottom: "6px" }}
                >
                  <button
                    onClick={() => handleLanguageSelection(lang)}
                    style={{
                      padding: "8px 12px",
                      borderRadius: "4px",
                      border: "none",
                      background: "#f0f0f0",
                      color: "#333",
                      cursor: "pointer",
                      transition: "background-color 0.3s",
                    }}
                  >
                    {lang}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {selectedLanguage && (
        <div>
          <h7>Enter Text for {selectedLanguage.code}</h7>
          <label>
            <input
              type="text"
              defaultValue={currFunctionName}
              onChange={(e) => handleTextChange(e)}
            />
          </label>
          <button onClick={handleAddLanguage}>Add</button>
        </div>
      )}
      <div>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {languages.map((lang) => (
            <li
              key={lang.code}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              <span style={{ marginRight: "8px" }}>
                <strong>{lang.code}:</strong> {lang.text}
              </span>
              <button
                onClick={() => handleDeleteLanguage(lang.code)}
                style={{
                  padding: "4px 8px",
                  borderRadius: "4px",
                  border: "none",
                  background: "#f0f0f0",
                  color: "#333",
                  cursor: "pointer",
                  transition: "background-color 0.3s",
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default LanguageComponent;
