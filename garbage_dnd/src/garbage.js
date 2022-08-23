import React, { useRef, useEffect, useReducer } from 'react'

function Garbage(props) {
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

    // forceUpdate();
    // useEffect(() => {
    // }, [props])

    return (
        <div className="garbage" draggable="true" ref={props.ref}>
            <img id="image_shower" className=" h-17 cursor-pointer absolute top-96 right-8" src={props.SelectedImage} />
        </div>
    )
}

export default Garbage