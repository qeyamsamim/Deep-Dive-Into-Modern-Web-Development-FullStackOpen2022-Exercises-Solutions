import React from "react";

const Paragraph = ({value, voteNumber, textOne, textTwo}) => {
    return <div>
        <p>{value}</p>
        <p>{textOne} {voteNumber} {textTwo}</p>
    </div>
}

export default Paragraph;