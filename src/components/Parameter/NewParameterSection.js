import React from "react";
import NewBooleanParameterBlock from "./Boolean/NewBooleanParameterBlock";
import NewNumberParameterBlock from "./Number/NewNumberParameterBlock";

const NewParameterSection = ({
  numberParameter,
  handlePropertyChange,
  booleanParameter,
  handlePropertyChangeBoolean,
  currParameters,
  setNumberParameter,
  updateNestedAttribute,
  ownArrayParameter,
  updateAttribute,
  //   setOwnArrayParameter,
}) => {
  const handleNumberChange = (checked, numberName) => {
    let newNumberParameter = { ...numberParameter }; // Make a copy of the existing object

    if (checked) {
      newNumberParameter[numberName] = {
        min: undefined,
        max: undefined,
        def: undefined,
        editorField: undefined,
        shadow: undefined,
      };
    } else {
      delete newNumberParameter[numberName];
    }

    updateAttribute("numberParameter", newNumberParameter);
  };

    const handleOwnArrayPropertyChange = (value, name) => {

      let newOwnArrayParameter = ownArrayParameter.map((x) => {
        if (x.name === name) {
          return { ...x, def: value === "" ? undefined : value };
        }
        return x;
      });
      
      updateAttribute("ownArrayParameter", newOwnArrayParameter);
      
    };

  return (
    <>
      <h5>Parameter section:</h5>
      {/* <button onClick={refreshParameters}>
        Refresh parameters
        <HelpInformation
          help={
            "This will refresh the parameters of your functions on the left!"
          }
        />
      </button> */}
      {numberParameter.length !== 0 && (
        <>
          <h7>Number</h7>
          {Object.keys(numberParameter).map((x) => (
            <NewNumberParameterBlock
              key={x} // Use a unique value as the key to trigger re-render
              parameter={x}
              handlePropertyChange={handlePropertyChange}
            />
          ))}
        </>
      )}
      {booleanParameter.length !== 0 && (
        <>
          <h6>Boolean</h6>
          {Object.keys(booleanParameter).map((x) => (
            <NewBooleanParameterBlock
              key={x}
              parameter={x}
              handlePropertyChangeBoolean={handlePropertyChangeBoolean}
            />
          ))}
        </>
      )}
      <div>
        {currParameters
          .filter((x) => x.type === undefined)
          .map((x) => (
            <div>
              Click if parameter "{x.name}" is a number:
              <input
                type="checkbox"
                onChange={(e) => handleNumberChange(e.target.checked, x.name)}
              />
            </div>
          ))}
      </div>
      {ownArrayParameter.length !== 0 && (
        <>
          <h7>Own Arrays:</h7>
          <div>
            {ownArrayParameter.map((x) => (
              <div>
                <h7>
                  should <strong>{x.name}</strong> have a default value:{" "}
                </h7>

                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  <label style={{ marginRight: "4px" }}>def Value:</label>
                  <input
                    id={`def-input-${x.name}`}
                    type="text"
                    style={{ width: "30%" }}
                    onBlur={(e) =>
                      handleOwnArrayPropertyChange(e.target.value, x.name)
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default NewParameterSection;
