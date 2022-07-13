import React from "react";

const Total = (props) => {
    return <p>Number of exercises {
        props.parts[0].exercise + props.parts[1].exercise + props.parts[2].exercise
    }</p>
}

export default Total;