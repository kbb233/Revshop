import React, { useState, useEffect } from "react";
import { TextField, Button, Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SellerPage: React.FC = () => {
    const [businessName, setBusinessName] = useState("");
    const [businessAddress, setBusinessAddress] = useState("");
    const navigate = useNavigate();
    const token = localStorage.getItem("jwt"); 
    const userId = localStorage.getItem("userId");
    useEffect(() => {
        
        if (!userId) {
            console.error("❌ No user ID found in localStorage!");
            return;
        }
        axios.get(`http://localhost:8080/api/sellers/profile/${userId}`, { withCredentials: true })
            .then(response => {
                console.log(response);
                
                if (response.data.businessName && response.data.businessAddress) {
                    localStorage.setItem("seller_id", response.data.id);
                    console.log(localStorage.getItem("seller_id"))
                    navigate("/createProducts");
                }
            })
            .catch(error => console.error("Error fetching seller profile:", error));
    }, [userId, navigate]);

    const handleSubmit = () => {
        axios.post("http://localhost:8080/api/sellers/updateProfile", {
            businessName,
            businessAddress
        }, { headers: { Authorization: `Bearer ${token}` },
            withCredentials: true })
        .then(response => {
            localStorage.setItem("seller_id", response.data.Id);
            console.log("✅ Seller ID stored:", response.data.id);
            navigate("/createProducts");
            }
        )
        .catch(error => console.error("Error updating profile:", error));
    };

    return (
        <Card style={{ width: 400, padding: 20 }}>
            <CardContent>
                <Typography variant="h5" gutterBottom>Seller Business Information</Typography>
                <TextField
                    fullWidth
                    label="Business Name"
                    variant="outlined"
                    margin="normal"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                />
                <TextField
                    fullWidth
                    label="Business Address"
                    variant="outlined"
                    margin="normal"
                    value={businessAddress}
                    onChange={(e) => setBusinessAddress(e.target.value)}
                />
                <Button 
                    variant="contained" 
                    color="primary" 
                    fullWidth 
                    onClick={handleSubmit}
                    style={{ marginTop: 20 }}
                >
                    Save & Continue
                </Button>
            </CardContent>
        </Card>
    );
};

export default SellerPage;
