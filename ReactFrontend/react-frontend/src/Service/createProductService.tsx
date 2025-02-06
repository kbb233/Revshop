import axios from "axios";

const API_URL = "http://localhost:8080/api/products";

export const createProduct = async (productData: FormData, token: string) => {
    try {
        const response = await axios.post(`${API_URL}/create`, productData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data", // Allows file upload
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error creating product:", error);
        throw error;
    }
};
