import axios from "axios";

const API_URL = "http://localhost:8080/api/users/register";

interface RegisterData {
    email: string;
    password: string;
    role:string;
}

export const registerService = async (data: RegisterData) => {
    try {
        const response = await axios.post(API_URL, data);
        return response.data;
    } catch (error: any) {
        throw error.response ? error.response.data : new Error("Registration failed");
    }
};