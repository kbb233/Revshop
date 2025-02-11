import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BuyerPage: React.FC = () => {
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("jwt"); 
    const baseURL = "http://localhost:8080/api/buyers/profile";


    useEffect(() => {
        if (!userId) {
            console.error("User ID not found in localStorage");
            return;
        }

        axios.get(`${baseURL}/${userId}`, { withCredentials: true} )
            .then(response => {
                if (response.data) {
                    console.log("Buyer profile found:", response.data);
                    localStorage.setItem("buyer_id", response.data.id);
                    navigate("/viewProductBuyer");
                } else {
                    console.log("No buyer profile found. Creating profile...");
                    axios.post(`${baseURL}/create`, { userId }, { withCredentials: true })
                        .then(createResponse => {
                            console.log("Buyer profile created:", createResponse.data);
                            localStorage.setItem("buyer_id", createResponse.data.id);
                            navigate("/viewProductBuyer");
                        })
                        .catch(createError => console.error("Error creating buyer profile:", createError));
                }
            })
            .catch(error => {
                console.error("Error fetching buyer profile:", error);
                if (error.response && error.response.status === 403) {
                    console.log("Buyer profile not found. Creating profile...");
                    axios.post(`${baseURL}/create`, { userId }, { withCredentials: true })
                        .then(createResponse => {
                            console.log("Buyer profile created:", createResponse.data);
                            localStorage.setItem("buyer_id", createResponse.data.id);
                            navigate("/viewProductBuyer");
                        })
                        .catch(createError => console.error("Error creating buyer profile:", createError));
                    }
                });
            }, [userId, navigate]);
    return <h1>Welcome to Buyer Page</h1>;
};

export default BuyerPage;
