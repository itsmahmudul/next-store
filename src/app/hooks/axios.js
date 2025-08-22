import axios from "axios";

// Create an axios instance
const api = axios.create({
    baseURL: "http://localhost:5000/api", // base URL for all requests
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;
