import React from "react";

const List = ({data, inputText, onClick}) => {
    const filteredData = data.filter((person) => {
        if (inputText === '') {
            return person;
        }
        else {
            return person.name.toLowerCase().includes(inputText);
        }
    });

    return filteredData.map(person => 
        <div key={person.id}>
            <p style={{display: "inline"}}>{person.name} {person.number}</p> 
            <span> </span>
            <button onClick={() => onClick(person.id, person.name)} style={{display: "inline"}}>Delete</button>
        </div>
    );
}

export default List;