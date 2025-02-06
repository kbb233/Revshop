import React, { useState } from "react";
import { TextField, Button, Card, CardContent, Typography, Select, MenuItem } from "@mui/material";
import { registerService } from "../Service/registerService";
import { Link, useNavigate } from "react-router-dom";

const RegisterComponent: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        try {
            await registerService({ email, password, role});
            navigate("/login");
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
                <Typography variant="h5" gutterBottom>Register</Typography>
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
                <TextField
                    fullWidth
                    label="Confirm Password"
                    variant="outlined"
                    margin="normal"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                    onClick={handleRegister}
                    style={{ marginTop: 20 }}
                >
                    Register
                </Button>
                <Typography variant="body2" style={{ marginTop: 10, textAlign: 'center' }}>
                    Already have an account? <Link to="/login">Log in now!</Link>
                </Typography>
            </CardContent>
        </Card>
    );
};

export default RegisterComponent;