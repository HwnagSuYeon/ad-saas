import axios from 'axios';

export const api = axios.create({
    // backend Nest server
    baseURL: 'http://localhost:3000'
});