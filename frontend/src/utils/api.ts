import axios from 'axios';

const baseURL = typeof window == "undefined" ?  '' : process.env.NEXT_PUBLIC_API;

const api = axios.create({
    baseURL: baseURL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;