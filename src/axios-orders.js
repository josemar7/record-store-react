import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://record-store-react.herokuapp.com'
    // baseURL: 'http://localhost:8080'
});

export default instance;