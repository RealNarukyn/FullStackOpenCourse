import axios from 'axios'

const BASE_URL = 'http://localhost:3001/persons'

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

