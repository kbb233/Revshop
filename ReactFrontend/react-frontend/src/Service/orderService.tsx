import axios from "axios";

const BASE_URL = "http://localhost:8080/api/orders";

export const orderService = {
    placeOrder: async (orderRequest: any) => {
        try {
            const response = await axios.post(`${BASE_URL}/create`, orderRequest, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            console.error("Error placing order:", error);
            throw error;
        }
    },

    getOrdersByBuyer: async (buyerId: number) => {
        try {
            const response = await axios.get(`${BASE_URL}/buyer/${buyerId}`, {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching orders:", error);
            throw error;
        }
    },
};

export default orderService;

