import React, { useState } from "react";
import "./Functions.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faFile, faTimes } from '@fortawesome/free-solid-svg-icons';

const FunctionContainer = () => {
  const [functions, setFunctions] = useState([]);

  const addFunction = () => {
    const newFunction = (
      <div key={functions.length + 1} className="file-item">
        <div className="file-item-content">
          <FontAwesomeIcon icon={faFile} className="file-icon" />
          Component {functions.length + 1}
        </div>
        <button className="remove-button" onClick={() => removeFunction(functions.length)}>
          <FontAwesomeIcon icon={faTimes} className="remove-icon" />
        </button>
      </div>
    );
    setFunctions(prevFunctions => [...prevFunctions, newFunction]);
  };

  const removeFunction = (index) => {
    setFunctions(prevFunctions => prevFunctions.filter((_, i) => i !== index));
  };

  return (
    <div className="function-window">
      <h5>Add your functions here:</h5>
      <div className="file-explorer">
        {functions}
      </div>
      <button className="add-button" onClick={addFunction}>
        <FontAwesomeIcon icon={faPlusCircle} className="icon" />
      </button>
    </div>
  );
};

export default FunctionContainer;
