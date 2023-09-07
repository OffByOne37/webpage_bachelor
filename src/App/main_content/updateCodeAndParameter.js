import { getNewParameter, getNewTypeParameters } from "./components/getNewParameterFile";

export function updateCodeAndParameter(updateAttribute, code, currFunction){
    updateAttribute("code", code);

    let result = getNewParameter(code, currFunction.currParameter);

    if (result !== false) {
      updateAttribute("currParameter", result);

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