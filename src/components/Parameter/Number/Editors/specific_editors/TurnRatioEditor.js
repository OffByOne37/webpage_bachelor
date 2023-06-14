import React, {useEffect} from "react";
import RangeEditor from "./RangeEditor";


const TurnRatioEditor = ({ parameter, handlePropertyChange }) => {

    // Call the handlePropertyChange function when the component is rendered for the first time
    useEffect(() => {
        handlePropertyChange("turnRatioPicker", parameter.name, "shadow");
    }, []);


    return (
    <RangeEditor parameter={parameter} handlePropertyChange={handlePropertyChange}/>
    )
}

export default TurnRatioEditor;