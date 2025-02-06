import React, { useState } from "react";
import { TextField, Button, Card, CardContent, Typography, Select, MenuItem } from "@mui/material";
import { loginService } from "../Service/loginService";
import { Link,useNavigate } from "react-router-dom";

const LoginComponent: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("BUYER");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const result = await loginService({ email, password ,role});
            console.log("Login successful:", result);
            
            if (result.role === "BUYER") {
                navigate("/buyerPage");
            } else if (result.role === "SELLER") {
                navigate("/sellerPage");
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unexpected error occurred");
            }
        }
    };

    return (
        <Card style={{ width: 400, padding: 20 }}>
            <CardContent>
                <Typography variant="h5" gutterBottom>Login</Typography>
                {error && <Typography color="error">{error}</Typography>}
                <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    fullWidth
                    label="Password"
                    variant="outlined"
                    margin="normal"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                 <Select
                    fullWidth
                    value={role}
                    onChange={(e) => setRole(e.target.value as string)}
                    style={{ marginTop: 10 }}
                >
                    <MenuItem value="BUYER">Buyer</MenuItem>
                    <MenuItem value="SELLER">Seller</MenuItem>
                </Select>
                <Button 
                    variant="contained" 
                    color="primary" 
                    fullWidth 
                    onClick={handleLogin}
                    style={{ marginTop: 20 }}
                >
                    Login
                </Button>
                <Typography variant="body2" style={{ marginTop: 10, textAlign: 'center' }}>
                    Not have an account? <Link to="/register">Register now!</Link>
                </Typography>
            </CardContent>
        </Card>
    );
};

export default LoginComponent;
