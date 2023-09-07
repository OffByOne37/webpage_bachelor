export function generateCodeForFunction(func){
    const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm;
    let functionToWork = func.code.replace(STRIP_COMMENTS, "").trim();
    functionToWork = functionToWork.startsWith("export")
      ? functionToWork
      : "export " + functionToWork;
    if (func.group !== undefined) {
      functionToWork =
        "//% group='" + func.group + "'\n" + functionToWork;
    }
    if (func.blockId === "") {
    } else {
      const blockSnippet = `//% blockID=${func.blockId}\n`;
      functionToWork = blockSnippet + functionToWork;
    }

    functionToWork =
      "//% inlineInputMode=" +
      (func.inline ? " internal" : " external") +
      "\n" +
      functionToWork;

    if (func.advanced) {
      functionToWork = "//% advanced=true\n" + functionToWork;
    }
    func.languages.map(
      (lang) =>
        (functionToWork =
          "//% block.loc." +
          lang.code +
          '="' +
          lang.text +
          '"\n' +
          functionToWork)
    );

    for (const paramName in func.numberParameter) {
      const x = func.numberParameter[paramName];
      let parameterString = "";

      if (
        x.min !== undefined ||
        x.max !== undefined ||
        x.def !== undefined ||
        x.editorField !== undefined ||
        x.shadow !== undefined
      ) {
        parameterString +=
          (x.min === undefined
            ? ""
            : "//% " + paramName + ".min=" + x.min + " \n") +
          (x.max === undefined
            ? ""
            : "//% " + paramName + ".max=" + x.max + " \n") +
          (x.def === undefined
            ? ""
            : "//% " + paramName + ".defl=" + x.def + " \n") +
          (x.editorField !== undefined
            ? "//% " + paramName + '.fieldEditor="' + x.editorField + '"\n'
            : "") +
          (x.shadow !== undefined
            ? "//% " + paramName + '.shadow="' + x.shadow + '"\n'
            : "");
      }

      functionToWork = parameterString + functionToWork;
    }

    for (const paramName in func.booleanParameter) {
      const x = func.booleanParameter[paramName];
      let parameterString = "";

      if (x.shadow !== undefined || x.def !== undefined) {
        parameterString +=
          (x.shadow !== undefined
            ? "//% " + paramName + '.shadow="' + x.shadow + '"\n'
            : "") +
          (x.def !== undefined
            ? "//% " + paramName + ".defl=" + x.def + "\n"
            : "");
      }

      functionToWork += parameterString;
    }

    // Now you can use the updated functionToWork

    if (func.expandable !== "null") {
      functionToWork =
        '//% expandableArgumentMode="' +
        [func.expandable] +
        '"\n' +
        functionToWork;
    }

    func.ownArrayParameter.forEach((element) => {
      if (element.def !== null) {
        functionToWork =
          "//% " +
          element.name +
          ".defl=" +
          element.def +
          "\n" +
          functionToWork;
      }
    });

    functionToWork =
      '//% block="' + func.currFunctionName + '"\n' + functionToWork;

    // setFinalFunction(functionToWork);
    //   updateAttribute("finalFunction", functionToWork);
    return functionToWork;

}