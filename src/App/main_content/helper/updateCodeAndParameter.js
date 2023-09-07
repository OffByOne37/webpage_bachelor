import { getNewParameter, getNewTypeParameters } from "./getNewParameterFile";

export function updateCodeAndParameter(updateAttribute, code, currFunction) {
  //Add the new Code
  updateAttribute("code", code);

  //returns new values or false if nothing changed.
  let result = getNewParameter(code, currFunction.currParameter);

  if (result !== false) {
    //set new Values
    updateAttribute("currParameter", result);

    //set new defaultFunctionName with new variables
    const newFunctionVal = `function ${result
      .map((param) => `$${param.name}`)
      .join(" ")}`;
    updateAttribute("currFunctionName", newFunctionVal);

    updateOwnArrays(result, updateAttribute, currFunction);

    updateAttribute(
      "numberParameter",
      getNewTypeParameters(result, currFunction.numberParameter, "number")
    );
    updateAttribute(
      "booleanParameter",
      getNewTypeParameters(result, currFunction.booleanParameter, "boolean")
    );
  }
}

function updateOwnArrays(result, updateAttribute, currFunction) {
  const extractedElements = result
    .filter(
      (param) =>
        param.type &&
        param.type.includes("[]") &&
        !param.type.includes("string[]") &&
        !param.type.includes("boolean[]") &&
        !param.type.includes("number[]")
    )
    .map((param) => ({
      name: param.name,
      def: currFunction.ownArrayParameter[param.name]?.def || undefined,
    }));

  updateAttribute("ownArrayParameter", extractedElements);
}
