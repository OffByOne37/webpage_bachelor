import React, { useEffect, useState } from "react";

const NoteEditor = ({ parameter, handlePropertyChange }) => {
    const [color, setColor] = useState('#ff8800');
    
    // Call the handlePropertyChange function when the component is rendered for the first time
    useEffect(() => {
        handlePropertyChange("note", parameter.name, "editorField");
    }, []);
    


    return (
        <>
        
        </>

    );
};

export default NoteEditor;
