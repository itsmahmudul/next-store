import axios from "axios";

// Create an axios instance
const api = axios.create({
    baseURL: "https://next-store-backend-beryl.vercel.app/", // base URL for all requests
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;
