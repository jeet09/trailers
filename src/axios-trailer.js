import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://cors-anywhere.herokuapp.com/https://in.bookmyshow.com/serv/',
    
});

export default instance;

