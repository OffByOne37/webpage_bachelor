import React from "react";
import RangeEditor from "./Number/Editors/specific_editors/RangeEditor";
import ColorEditor from "./Number/Editors/specific_editors/ColorEditor";
import NoteEditor from "./Number/Editors/specific_editors/NoteEditor";
import IntegerEditor from "./Number/Editors/specific_editors/IntegerEditor";
import ProtractorEditor from "./Number/Editors/specific_editors/ProtractorEditor";
import SpeedEditor from "./Number/Editors/specific_editors/SpeedEditor";
import TimeEditor from "./Number/Editors/specific_editors/TimeEditor";
import TurnRatioEditor from "./Number/Editors/specific_editors/TurnRatioEditor";
import VariableEditor from "./Number/Editors/specific_editors/VariableEditor";
import { EditorField } from './Number/EditorField';
import { PossibleBoolEditors } from "./Boolean/PossibleBoolEditors";
import ToggleEditor from "./Boolean/specific_editor/ToggleEditor";
import NewRangeEditor from "./Number/Editors/specific_editors/NewRangeEditor";
import NewVariableEditor from "./Number/Editors/specific_editors/NewVariableEditor";
import NewToggleEditor from "./Boolean/specific_editor/NewToggleEditor";
import NewTurnRatioEditor from "./Number/Editors/specific_editors/NewTurnRatioEditor";
import NewTimeEditor from "./Number/Editors/specific_editors/NewTimeEditor";
import NewSpeedEditor from "./Number/Editors/specific_editors/NewSpeedEditor";
import NewProtractorEditor from "./Number/Editors/specific_editors/NewProtractorEditor";
import NewIntegerEditor from "./Number/Editors/specific_editors/NewIntegerEditor";
import NewNoteEditor from "./Number/Editors/specific_editors/NewNoteEditor";
import NewColorEditor from "./Number/Editors/specific_editors/NewColorEditor";

//If someone wants to add an Editor simply add [EditorField.NewField]: NewEditorComponent. 
//Moreover it must be changed in "./EditorField"
const componentMap = {
  [EditorField.Range]: NewRangeEditor,
  [EditorField.Color]: NewColorEditor,
  [EditorField.Note]: NewNoteEditor,
  [EditorField.Int]: NewIntegerEditor,
  [EditorField.Protractor]: NewProtractorEditor,
  [EditorField.Speed]: NewSpeedEditor,
  [EditorField.Time]: NewTimeEditor,
  [EditorField.TurnRatio]: NewTurnRatioEditor,
  [EditorField.Variable]: NewVariableEditor,
  [PossibleBoolEditors.Toggle]: NewToggleEditor,
  [PossibleBoolEditors.Variable]: NewVariableEditor
};

const NewSpecificEditor = ({ parameter, editorField, handlePropertyChange }) => {
  const EditorComponent = componentMap[editorField];

  if (EditorComponent) {
    return <EditorComponent parameter={parameter} handlePropertyChange={handlePropertyChange} />;
  } else {
    console.log("Default case");
    return null;
  }
};

export default NewSpecificEditor;
