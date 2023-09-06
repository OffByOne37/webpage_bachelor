import React from "react";
import { PossibleBoolEditors } from "./Boolean/PossibleBoolEditors";
import ToggleEditor from "./Boolean/specific_editor/ToggleEditor";
import { EditorField } from './Number/EditorField';
import ColorEditor from "./Number/Editors/specific_editors/ColorEditor";
import IntegerEditor from "./Number/Editors/specific_editors/IntegerEditor";
import NoteEditor from "./Number/Editors/specific_editors/NoteEditor";
import ProtractorEditor from "./Number/Editors/specific_editors/ProtractorEditor";
import RangeEditor from "./Number/Editors/specific_editors/RangeEditor";
import SpeedEditor from "./Number/Editors/specific_editors/SpeedEditor";
import TimeEditor from "./Number/Editors/specific_editors/TimeEditor";
import TurnRatioEditor from "./Number/Editors/specific_editors/TurnRatioEditor";
import VariableEditor from "./Number/Editors/specific_editors/VariableEditor";

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
  [PossibleBoolEditors.Toggle]: ToggleEditor,
  [PossibleBoolEditors.Variable]: VariableEditor
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
