import axios from "axios";

export const api = axios.create({
    baseURL : 'http://localhost:5000',
    headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer your_token_here',
      },
});