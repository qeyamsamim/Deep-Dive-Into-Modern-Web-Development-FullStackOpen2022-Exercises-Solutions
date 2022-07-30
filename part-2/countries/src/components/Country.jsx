import React, { useState } from "react";
import Language from "./Language";

const Country = ({data}) => {

    return data.map((country, index) => 
        <div key={index}>
            <h2>{country.name.common}</h2>
            <p>{country.capital}</p>
            <p>area {country.area}</p>
            <h4>Languages:</h4>
            <Language language={country.languages}/>
            <img src={country.flags.png}></img>
        </div>);
}

export default Country;