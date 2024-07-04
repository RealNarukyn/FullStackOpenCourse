import axios from 'axios'

/**
 * To use the JSON-Server we need to wake it up with:
 *      npm run server
 * this will set the local server at:
 *      http://localhost:3001/persons
 */
//const BASE_URL = 'http://localhost:3001/persons'        // Works for: JSON-SERVER DB

const BASE_URL = '/api/persons'                           // Works for: our backend in part3 

const getAllPeople = () => axios.get(BASE_URL);

const getPersonById = id => axios.get(`${BASE_URL}/${id}`);

const createPerson = INewPerson => axios.post(BASE_URL, INewPerson);

const updatePerson = (id, INewPerson) => axios.put(`${BASE_URL}/${id}`, INewPerson);

const deletePerson = id => axios.delete(`${BASE_URL}/${id}`);

export default {
    getAllPeople, 
    getPersonById,
    createPerson, 
    updatePerson,
    deletePerson
}

