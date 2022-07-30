import React, { useEffect, useState } from "react";
import axios from "axios";
import Country from "./Country";
import CountryList from "./CountryList";

const App = () => {

    const [countries, setCountries] = useState([]);
    const [inputText, setInputText] = useState("");

    const hook = () => {
        axios
            .get("https://restcountries.com/v3.1/all")
            .then(response => {
                setCountries(response.data);
            });
    }
    
    useEffect(hook, []);
    
    const handleSearch = (event) => {
        setInputText(event.target.value.toLowerCase());
    }

    const filteredCountries = countries.filter((country) => {
        if (inputText !== '') {
            const name = country.name.common;
            return name.toLowerCase().includes(inputText);
        }
    });

    const dataLength = filteredCountries.length;

    return <div>
        <div>
            Find countries <input type="text" onChange={handleSearch} />
            {dataLength !== 1 || <Country data={filteredCountries} />}
            {(dataLength > 10 || dataLength <= 2) || <CountryList data={filteredCountries} />}
            {dataLength <= 10 || <p>Too many matches, specify another filter.</p>}
        </div>
    </div>
}

export default App;