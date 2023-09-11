import { stripComments } from "./generateFunctionFile";
import isEqual from "lodash/isEqual";


export function getNewParameter(code, currParameter) {
  const ARGUMENT_NAMES = /([^\s,]+(?:\s+[^\s,]+)*)/g;

  const fnStr = stripComments(code);
  const match = fnStr.match(/function\s*\w*\s*\(([^)]*)\)/);
  if (match === null || match.length < 2) {
    if (currParameter.length !== 0) {
        return [];
    }
    return false;
  }

  const parameters = match[1].match(ARGUMENT_NAMES);
  if (parameters === null) {
    if (currParameter.length !== 0) {
      return [];
    }
    return false;
  }

  const result = parameters.map((param) => {
    const [name, type] = param.split(":").map((item) => item.trim());
    return { name, type: type || undefined };
  });

  if (!isEqual(currParameter, result)) {
    return result;
  }
  return false;
}

export function getNewTypeParameters (allParameter, prevParameters, type){
    const updatedParameters = {};

    allParameter.forEach((param) => {
      if (param.type && param.type === type) {
        if (prevParameters[param.name]) {
          updatedParameters[param.name] = { ...prevParameters[param.name] };
        } else {
          updatedParameters[param.name] = {
            min: undefined,
            max: undefined,
            def: undefined,
            editorField: undefined,
            shadow: undefined,
          };
        }
      }
    });

    return updatedParameters;
}