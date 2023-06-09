import React, { useEffect, useState } from "react";
import { SliderPicker } from "react-color";
import colorNumberPickerImage from "./editor_pictures/color_number_picker.png";
import colorWheelPickerImage from "./editor_pictures/color_wheel_picker.png";
import colorWheelHSVPickerImage from "./editor_pictures/color_wheel_hsv_picker.png";
import "./ColorEditor.css"; // Import the CSS file for styling

const ColorEditor = ({ parameter, handlePropertyChange }) => {
    const [color, setColor] = useState('#ff8800');
    
    // Call the handlePropertyChange function when the component is rendered for the first time
    useEffect(() => {
        handlePropertyChange("colorNumberPicker", parameter.name, "editorField")
        handlePropertyChange(color, parameter.name, "def");
    }, []);

    const handleColorChange = (colorNew) => {
        handlePropertyChange(colorNew.hex, parameter.name, "def");
        setColor(colorNew);
    }

    return (
        <>
            <p>How should your color EditorField look like?</p>

            <div className="color-editor-container">
                <button
                    onClick={() => handlePropertyChange("colorNumberPicker", parameter.name, "editorField")}
                    className="color-editor-button"
                    style={{ border: parameter.editorField === "colorNumberPicker" ? "2px solid blue" : "", }}>
                    <p>Simple Color Picker</p>
                    <img
                        src={colorNumberPickerImage}
                        alt="Color Number Picker"
                        className="button-img"
                    />
                </button>
                <button
                    onClick={() => handlePropertyChange("colorWheelPicker", parameter.name, "editorField")}
                    className="color-editor-button"
                    style={{ border: parameter.editorField === "colorWheelPicker" ? "2px solid blue" : "", }}
                >
                    <p>Simple Color Wheel</p>
                    <img
                        src={colorWheelPickerImage}
                        alt="Color Wheel Picker"
                        className="button-img"
                    />
                </button>
                <button
                    onClick={() => handlePropertyChange("colorWheelHsvPicker", parameter.name, "editorField")}
                    className="color-editor-button"
                    style={{ border: parameter.editorField === "colorWheelHsvPicker" ? "2px solid blue" : "", }}>
                    <p>HSV Color Wheel</p>
                    <img
                        src={colorWheelHSVPickerImage}
                        className="button-img"
                        alt="Color Wheel HSV Picker"
                    />
                </button>
            </div>
            <div>
                Default Value:
                <SliderPicker color={color} onChangeComplete={handleColorChange} />
            </div>
        </>

    );
};

export default ColorEditor;
