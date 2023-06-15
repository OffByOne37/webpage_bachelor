import React from "react";
import HelpInformation from "../HelpInformation";
import NumberParameterBlock from "./Number/NumberParameterBlock";
import BooleanParameterBlock from "./Boolean/BooleanParameterBlock";

const ParameterSection = ({
  refreshParameters,
  numberParameter,
  handlePropertyChange,
  booleanParameter,
  handlePropertyChangeBoolean,
  currParameters,
  setNumberParameter,
  ownArrayParameter,
  setOwnArrayParameter,
}) => {
  const handleNumberChange = (checked, numberName) => {
    if (checked) {
      setNumberParameter((prevParameter) => [
        ...prevParameter,
        {
          name: numberName,
          min: undefined,
          max: undefined,
          def: undefined,
          editorField: undefined,
          shadow: undefined,
        },
      ]);
    } else {
      setNumberParameter((prevParameter) =>
        prevParameter.filter((x) => x.name !== numberName)
      );
    }
  };

  const handleOwnArrayPropertyChange = (value, name) => {
    setOwnArrayParameter((prevParameter) => {
      const updatedParameter = prevParameter.map((x) => {
        if (x.name === name) {
          return { ...x, defaultValue: value === "" ? null : value };
        }
        return x;
      });
      return updatedParameter;
    });
  };

  return (
    <>
      <h5>Parameter section:</h5>
      <button onClick={refreshParameters}>
        Refresh parameters
        <HelpInformation
          help={
            "This will refresh the parameters of your functions on the left!"
          }
        />
      </button>
      {numberParameter.length !== 0 && (
        <>
          <h7>Number</h7>
          {numberParameter.map((x) => (
            <NumberParameterBlock
              key={x.name} // Use a unique value as the key to trigger re-render
              parameter={x}
              handlePropertyChange={handlePropertyChange}
            />
          ))}
        </>
      )}
      {booleanParameter.length !== 0 && (
        <>
          <h6>Boolean</h6>
          {booleanParameter.map((x) => (
            <BooleanParameterBlock
              key={x.name}
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

export default ParameterSection;
