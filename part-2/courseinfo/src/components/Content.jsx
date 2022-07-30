import React from "react";
import Part from "./Part";

const Content = (props) => {
    return ( 
    <div>
        {(props.parts).map (part => <Part key={part.id} id={part.id} part={part.name} exercise={part.exercise} />)}
    </div>
    );
}

export default Content;