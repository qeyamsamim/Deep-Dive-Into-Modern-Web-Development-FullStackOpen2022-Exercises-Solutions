import React from "react";

const Language = ({language}) => {
    return Object.keys(language).map((lan, index) => <li key={index}>{language[lan]}</li>);
}

export default Language;