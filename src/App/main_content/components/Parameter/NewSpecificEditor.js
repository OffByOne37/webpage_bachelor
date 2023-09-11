import React from "react";
import { PossibleBoolEditors } from "./Boolean/PossibleBoolEditors";
import NewToggleEditor from "./Boolean/specific_editor/NewToggleEditor";
import { EditorField } from './Number/EditorField';
import NewColorEditor from "./Number/Editors/specific_editors/NewColorEditor";
import NewIntegerEditor from "./Number/Editors/specific_editors/NewIntegerEditor";
import NewNoteEditor from "./Number/Editors/specific_editors/NewNoteEditor";
import NewProtractorEditor from "./Number/Editors/specific_editors/NewProtractorEditor";
import NewRangeEditor from "./Number/Editors/specific_editors/NewRangeEditor";
import NewSpeedEditor from "./Number/Editors/specific_editors/NewSpeedEditor";
import NewTimeEditor from "./Number/Editors/specific_editors/NewTimeEditor";
import NewTurnRatioEditor from "./Number/Editors/specific_editors/NewTurnRatioEditor";
import NewVariableEditor from "./Number/Editors/specific_editors/NewVariableEditor";

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
    return null;
  }
};

export default NewSpecificEditor;
