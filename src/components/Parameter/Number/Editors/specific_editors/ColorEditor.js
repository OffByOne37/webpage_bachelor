import React, { useEffect, useState } from "react";
import { SliderPicker } from "react-color";
import colorNumberPickerImage from "../editor_pictures/color_number_picker.png";
import colorWheelPickerImage from "../editor_pictures/color_wheel_picker.png";
import colorWheelHSVPickerImage from "../editor_pictures/color_wheel_hsv_picker.png";
import "../../../PictureEditor.css"; // Import the CSS file for styling

const ColorEditor = ({ parameter, handlePropertyChange }) => {
    const [color, setColor] = useState({
        "hsl": {
          "h": 332.6470588235294,
          "s": 0.653846153846154,
          "l": 0.20392156862745098,
          "a": 1
        },
        "hex": "#561231",
        "hsv": {
          "h": 332.6470588235294,
          "s": 0.7906976744186047,
          "v": 0.33725490196078434,
          "a": 1
        },
      });

    useEffect(() =>{
        if(parameter.shadow ==="colorNumberPicker"){
            handlePropertyChange(color.hex, parameter.name, "def");
        }else if(parameter.shadow==="colorWheelPicker"){
            let val = ((Math.floor(((color.oldHue/360)*255))+130)%255);
            handlePropertyChange(val, parameter.name, "def");
        }else {
            let val = Math.floor(((color.oldHue/360)*255));
            handlePropertyChange(val, parameter.name, "def");
        }

    }, [color, parameter.shadow])



    // Call the handlePropertyChange function when the component is rendered for the first time
    useEffect(() => {
        handlePropertyChange("colorNumberPicker", parameter.name, "shadow")
        handlePropertyChange(color.hex, parameter.name, "def");
    }, []);


    return (
        <>
            <p>How should your color EditorField look like?</p>

            <div className="picture-editor-container">
                <button
                    onClick={() => handlePropertyChange("colorNumberPicker", parameter.name, "shadow")}
                    className="picture-editor-button"
                    style={{ border: parameter.shadow === "colorNumberPicker" ? "2px solid blue" : "", }}>
                    <p>Simple Color Picker</p>
                    <img
                        src={colorNumberPickerImage}
                        alt="Color Number Picker"
                        className="button-img"
                    />
                </button>
                <button
                    onClick={() => handlePropertyChange("colorWheelPicker", parameter.name, "shadow")}
                    className="picture-editor-button"
                    style={{ border: parameter.shadow === "colorWheelPicker" ? "2px solid blue" : "", }}
                >
                    <p>Simple Color Wheel</p>
                    <img
                        src={colorWheelPickerImage}
                        alt="Color Wheel Picker"
                        className="button-img"
                    />
                </button>
                <button
                    onClick={() => handlePropertyChange("colorWheelHsvPicker", parameter.name, "shadow")}
                    className="picture-editor-button"
                    style={{ border: parameter.shadow === "colorWheelHsvPicker" ? "2px solid blue" : "", }}>
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
                <SliderPicker color={color} onChangeComplete={setColor} />
            </div>
        </>

    );
};

export default ColorEditor;
