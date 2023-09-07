export function generateCodeForFunction(func) {
  let errors = errorCheck(func);
  if(errors){
    return null;
  }

    const functionToWork = stripComments(func.code);
    const isExported = func.code.startsWith("export");
    const blockSnippet = func.blockId !== "" ? `//% blockID=${func.blockId}\n` : "";
  
    let result = isExported ? functionToWork : `export ${functionToWork}`;
    result = `${blockSnippet}${result}`;
    result = `//% inlineInputMode=${func.inline ? " internal" : " external"}\n${result}`;

    if (func.group !== undefined) {
      result = `//% group='${func.group}'\n${result}`;
    }
  
    if (func.advanced) {
      result = `//% advanced=true\n${result}`;
    }
  
    func.languages.forEach((lang) => {
      result = `//% block.loc.${lang.code}='${lang.text}'\n${result}`;
    });
  
    result = addParametersToCode(result, func.numberParameter, "number");
    result = addParametersToCode(result, func.booleanParameter, "boolean");
  
    if (func.expandable !== undefined) {
      result = `//% expandableArgumentMode='${func.expandable}'\n${result}`;
    }
  
    func.ownArrayParameter.forEach((element) => {
      if (element.def !== null) {
        result = `//% ${element.name}.defl=${element.def}\n${result}`;
      }
    });
  
    result = `//% block='${func.currFunctionName}'\n${result}`;
  
    return result;
  }
  
  export function stripComments(code) {
    const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm;
    return code.replace(STRIP_COMMENTS, "").trim();
  }
  
  function addParametersToCode(code, parameters, type) {
    let result = code;
  
    for (const paramName in parameters) {
      const x = parameters[paramName];
      let parameterString = "";
  
      if (x.min !== undefined || x.max !== undefined || x.def !== undefined || x.editorField !== undefined || x.shadow !== undefined) {
        parameterString += (x.min === undefined ? "" : `//% ${paramName}.min=${x.min}\n`);
        parameterString += (x.max === undefined ? "" : `//% ${paramName}.max=${x.max}\n`);
        parameterString += (x.def === undefined ? "" : `//% ${paramName}.defl=${x.def}\n`);
        parameterString += (x.editorField !== undefined ? `//% ${paramName}.fieldEditor='${x.editorField}'\n` : "");
        parameterString += (x.shadow !== undefined ? `//% ${paramName}.shadow='${x.shadow}'\n` : "");
      }
  
      result = `${parameterString}${result}`;
    }
  
    return result;
  }


function errorCheck(func){
  let errorHappened = false;
  if(func.blockIdRequired && func.blockId === ""){
    alert("BlockID required was ticked. But no BlockID has been entered.");
    errorHappened=true;
  }
  if(func.group === ""){
    alert("Group was ticked. But no Group has been entered.");
    errorHappened=true;
  }
  if (func.expandable !== undefined) {
    alert(`Expandable (${func.expandable}) was ticked. But no "||" has not been entered.`);
    errorHappened=true;
  }
  return errorHappened;

}
  