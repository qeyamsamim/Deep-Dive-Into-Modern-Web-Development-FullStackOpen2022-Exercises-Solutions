import axios from "axios";
const baseURL = "/api/persons";

const getPersons = () => {
    const request = axios.get(baseURL)
    return request.then(response => response.data);
}

const createPerson = newPerson => {
    const request = axios.post(baseURL, newPerson);
    return request.then(response => response.data);
}

const deletePerson = personId => {
    const request = axios.delete(`${baseURL}/${personId}`);
    return request.then(response => response.data);
}

const updatePerson = (personId, newPerson) => {
    const request = axios.put(`${baseURL}/${personId}`, newPerson);
    return request.then(response => response.data);
}

export default { getPersons, createPerson, deletePerson, updatePerson }