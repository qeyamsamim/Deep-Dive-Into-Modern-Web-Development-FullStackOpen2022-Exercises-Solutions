import React, { useState } from "react";

const CountryList = ({data}) => {

    return data.map(country => 
        <div key={country.name.common}>
            <p>{country.name.common}</p>
            <button>show</button>
        </div>);
}

export default CountryList;