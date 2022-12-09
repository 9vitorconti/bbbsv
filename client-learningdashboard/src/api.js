import axios from 'axios';
const ENDPOINT_URL = 'http://194.195.127.200:3001'

export const fetchData = async () => {
    const response = await axios.get(`${ENDPOINT_URL}/api`);
    return response.data;
}

