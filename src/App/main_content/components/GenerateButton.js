import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import "./css/GenerateButton.css"

const GenerateButton = ({ onClick }) => {
   return (
     <button className="generate-button" onClick={onClick}>
       <FontAwesomeIcon icon={faCog} className="button-icon" />
     </button>
   );
};

export default GenerateButton;
