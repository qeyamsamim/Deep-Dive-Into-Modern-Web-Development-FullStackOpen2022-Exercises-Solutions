import React from "react";

const Total = ({parts}) => {

    const total = (parts).reduce((a, b) => a + b.exercise, 0);

    return <p style={{fontWeight: "bold"}}>Total of {total} exercises</p>
}

export default Total;