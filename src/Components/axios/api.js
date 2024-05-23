import axios from "axios";
import Cookie from 'js-cookie';

export const baseUrl = "http://localhost:4500/api";
// export const baseUrl = "https://http://localhost:4500/api";

export const api = axios.create({
    baseURL: baseUrl,
    headers: {
        "Content-Type": "application/json",
        'token': Cookie.get('authToken')
    },
});

