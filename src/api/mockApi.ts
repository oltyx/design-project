import axios from 'axios';

const PORT = 3333;

export default axios.create({
    baseURL: 'http://localhost:' + PORT
})