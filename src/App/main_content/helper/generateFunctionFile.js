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
    result = `//% inlineInputMode=${func.inline ? "internal" : "external"}\n${result}`;

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
      result = `//% expandableArgumentMode="${func.expandable}"\n${result}`;
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
    alert("Group option was selected, but no group name has been entered.");
    errorHappened=true;
  }
  if (func.expandable !== undefined && !func.currFunctionName.includes("||")) {
    alert(`Expandable (${func.expandable}) was ticked. But "||" has not been entered.`);
    errorHappened=true;
  }
  for (const key in func.numberParameter) {
    
      const obj = func.numberParameter[key];
      const hasMin = obj.min !== undefined;
      const hasMax = obj.max !== undefined;

      //xor
      if((hasMax || hasMin) && !(hasMax && hasMax)){
        alert(`It is not possible to have a minimum value without specifying a maximum value, or a maximum value without specifying a minimum value. Please add the missing value for the function ${func.currFunctionName}.`)
        errorHappened=true;
      }
      if(obj.shadow && obj.shadow==="speedPicker" && obj.def && obj.def > 100 || obj.def <-100){
        alert(`Speed should be between -100% and 100%. However, MakeCode will still use this value and it works; therefore, the function should be generated if there are no other problems. (${func.currFunctionName})`)
      }
  }
  return errorHappened;

  

}
  