import React, { useEffect } from "react";
import NewRangeEditor from "./NewRangeEditor";
import Warning from "../../../../Warning";
import NewGetDefaultValue from "./helper/NewGetDefaultValue";

const NewTurnRatioEditor = ({ parameter, handlePropertyChange }) => {
  // Call the handlePropertyChange function when the component is rendered for the first time
  useEffect(() => {
    handlePropertyChange("turnRatioPicker", parameter, "shadow");
  }, []);

  return (
    <>
      <Warning
        message={`When releasing this page, the implementation from Microsoft:PXT was wrong. Default value works, min/max does not work. An issue was made (https://github.com/microsoft/pxt/issues/9676). For further information or if you think the problem has been resolved, contact me. If the problem is resolved I will restore the old page version where one could add a min and max value. `}
      />
    <NewGetDefaultValue parameter={parameter} handlePropertyChange={handlePropertyChange} onlyNumber={true}/>

      {/* <NewRangeEditor
        parameter={parameter}
        handlePropertyChange={handlePropertyChange}
      /> */}
    </>
  );
};

export default NewTurnRatioEditor;
