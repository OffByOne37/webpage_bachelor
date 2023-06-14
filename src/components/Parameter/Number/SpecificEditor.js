import React from "react";
import RangeEditor from "./Editors/specific_editors/RangeEditor";
import ColorEditor from "./Editors/specific_editors/ColorEditor";
import NoteEditor from "./Editors/specific_editors/NoteEditor";
import IntegerEditor from "./Editors/specific_editors/IntegerEditor";
import ProtractorEditor from "./Editors/specific_editors/ProtractorEditor";
import SpeedEditor from "./Editors/specific_editors/SpeedEditor";
import TimeEditor from "./Editors/specific_editors/TimeEditor";
import TurnRatioEditor from "./Editors/specific_editors/TurnRatioEditor";
import VariableEditor from "./Editors/specific_editors/VariableEditor";
import { EditorField } from './EditorField';

//If someone wants to add an Editor simply add [EditorField.NewField]: NewEditorComponent. 
//Moreover it must be changed in "./EditorField"
const componentMap = {
  [EditorField.Range]: RangeEditor,
  [EditorField.Color]: ColorEditor,
  [EditorField.Note]: NoteEditor,
  [EditorField.Int]: IntegerEditor,
  [EditorField.Protractor]: ProtractorEditor,
  [EditorField.Speed]: SpeedEditor,
  [EditorField.Time]: TimeEditor,
  [EditorField.TurnRatio]: TurnRatioEditor,
  [EditorField.Variable]: VariableEditor,
};

const SpecificEditor = ({ parameter, editorField, handlePropertyChange }) => {
  const EditorComponent = componentMap[editorField];

  if (EditorComponent) {
    return <EditorComponent parameter={parameter} handlePropertyChange={handlePropertyChange} />;
  } else {
    console.log("Default case");
    return null;
  }
};

export default SpecificEditor;
