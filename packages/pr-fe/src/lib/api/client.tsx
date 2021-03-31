import axios from 'axios';

// TODO: change url
const client = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/',
});

export default client;
