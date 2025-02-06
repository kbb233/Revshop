import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/login";

interface LoginData {
    email: string;
    password: string;
    role: string;
}

export const loginService = async (data: LoginData) => {
    try {
        const response = await axios.post(API_URL, data);
        if (response.data.token) { 
        localStorage.setItem("jwt", response.data.token);
        localStorage.setItem("userId", response.data.id);
    }
        return response.data;
    } catch (error:any) {
        throw error.response ? error.response.data : new Error("Login failed");
    }
};