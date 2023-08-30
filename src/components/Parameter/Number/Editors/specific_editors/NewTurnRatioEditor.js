import React, {useEffect} from "react";
import RangeEditor from "./RangeEditor";
import NewRangeEditor from "./NewRangeEditor";


const NewTurnRatioEditor = ({ parameter, handlePropertyChange }) => {

    // Call the handlePropertyChange function when the component is rendered for the first time
    useEffect(() => {
        handlePropertyChange("turnRatioPicker", parameter, "shadow");
    }, []);


    return (
    <NewRangeEditor parameter={parameter} handlePropertyChange={handlePropertyChange}/>
    )
}

export default NewTurnRatioEditor;