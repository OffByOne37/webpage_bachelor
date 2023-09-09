import React, {useState } from "react";
import { Piano, KeyboardShortcuts, MidiNumbers } from "react-piano";
import "./css/PianoStyle.css";
import * as Tone from "tone";

const OwnPiano = ({ parameter, handlePropertyChange }) => {
  const firstNote = MidiNumbers.fromNote("a1");
  const lastNote = MidiNumbers.fromNote("b5");
  const keyboardShortcuts = KeyboardShortcuts.create({
    firstNote: firstNote,
    lastNote: lastNote,
    keyboardConfig: KeyboardShortcuts.HOME_ROW,
  });
  const [pressedNote, setPressedNote] = useState("none");

  const synth = new Tone.Synth().toDestination();

  const playNote = (midiNumber) => {
    const noteName = MidiNumbers.getAttributes(midiNumber).note;
    //conversion from midi to hz
    const hzValue = 440 * Math.pow(2, (midiNumber - 69) / 12);
    synth.triggerAttackRelease(noteName, "8n");
    setPressedNote(noteName);
    handlePropertyChange(
      hzValue,
      parameter,
      "def"
    );
  };

  // Function to stop playing a note
  const stopNote = (midiNumber) => {};

  return (
    <div>

      <Piano 
        noteRange={{ first: firstNote, last: lastNote }}
        playNote={playNote}
        stopNote={stopNote}
        width={580}
        keyboardShortcuts={keyboardShortcuts}
        className="ReactPiano__Keyboard"
      />
      <label>Last pressed Note (and default value) is: {pressedNote}.</label>
    </div>
  );
};

export default OwnPiano;
