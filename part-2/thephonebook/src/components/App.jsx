import { useEffect, useState } from 'react';
import objectsEquality from '../objectsEquality';
import List from "./List";
import Input from "./Input";
import Heading2 from "./Heading2";
import personsService from "../services/persons";
import Message from './Message';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [inputText, setInputText] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const hook = () => {
    personsService
      .getPersons()
      .then(intialPersons => {
        setPersons(intialPersons);
      });
  }

  useEffect(hook, []);

  const addName = (event) => {
    event.preventDefault();

    const newPerson = {
        name: newName,
        number: newNumber
    }

    const personInList = persons.find(person => objectsEquality(person.name, newPerson.name));
    
    if (personInList) {
      const options = confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`);
      if (options) {
        personsService
          .updatePerson(personInList.id, newPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.name === newPerson.name ? returnedPerson : person));
            setMessage(`${personInList.name}'s number was successfully changed.`);
            setMessageType("success");
          })
          .catch(message => {
            setMessage(`Information of ${personInList.name} has already been removed from server.`);
            setMessageType("error");
            setPersons(persons.filter(p => p.id !== personInList.id))
          })
      }
    } else {
        personsService
          .createPerson(newPerson)
          .then(intialPersons => {
            setPersons(persons.concat(intialPersons));
            setMessage(`${intialPersons.name} was successfully added.`);
            setMessageType("success");
          })
          .catch(error => {
            setMessage(error.response.data.error);
            setMessageType("error");
          })
    }
    setTimeout(() => {
      setMessage(null);
    }, 5000);
    setNewName('');
    setNewNumber('');
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleFilter = (event) => {
    const lowerCaseInput = event.target.value.toLowerCase();
    setInputText(lowerCaseInput);
  }

  const handleDelete = (id, name) => {
    const option = confirm(`Delete ${name}?`);
    if (option) {
      personsService
        .deletePerson(id)
        .then(() => {
          setPersons(prevValue => {
            return prevValue.filter(data => data.id !== id);
          })
        })
    }
  }

  return (
    <div>
      <Heading2 text="Phonebook" />
      {!message || <Message message={message} messageType={messageType} />}
      <div>
          filter shown with <input onChange={handleFilter}/>
      </div>
      <Heading2 text="Add a new" />
      <form onSubmit={addName}>
        <Input text="name:" value={newName} onChange={handlePersonChange} />
        <Input text="number:" value={newNumber} onChange={handleNumberChange} />
        <button type="submit">add</button>
      </form>
      <Heading2 text="Numbers" />
      <List data={persons} inputText={inputText} onClick={handleDelete}/>
    </div>
  )
}

export default App