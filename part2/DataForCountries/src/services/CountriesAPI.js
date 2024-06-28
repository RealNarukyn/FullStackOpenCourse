import axios from 'axios'

const URL = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAll = () => axios.get(`${URL}/all`);

const getByName = country => axios.get(`${URL}/name/${country}`);

export default {
    getAll,
    getByName
}

