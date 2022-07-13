import React from "react";
import Part from "./Part";

const Content = (props) => {
    
    return ( 
    <div>
        <Part part={props.parts[0].name} exercise={props.parts[0].exercise} />
        <Part part={props.parts[1].name} exercise={props.parts[1].exercise} />
        <Part part={props.parts[2].name} exercise={props.parts[2].exercise} />
    </div>
    );
}

export default Content;