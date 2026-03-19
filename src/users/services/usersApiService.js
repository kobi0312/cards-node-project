import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5000";
const apiUrl = `${BASE_URL}/api/auth`;

export const login = async (userLogin) => {
    try {
        const response = await axios.post(`${apiUrl}/login`, userLogin);
        const data = response.data
        return data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data);
        }
        else throw new Error(error.message);
    }
}

export const signup = async (normalizedUser) => {
    try {
        const response = await axios.post(`${apiUrl}/register`, normalizedUser);
        const data = response.data
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
}
