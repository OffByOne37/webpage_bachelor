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
        message={`When this page was released, the implementation from Microsoft:PXT was incorrect. The default value functionality was working, but the min/max functionality was not functioning correctly. An issue has been created and can be found at GitHub (https://github.com/microsoft/pxt/issues/9676) for further information. If you believe the problem has been resolved or need additional details, please feel free to reach out to me. If the issue is resolved, I will restore the previous version of the page where it was possible to specify both minimum and maximum values.`}
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
