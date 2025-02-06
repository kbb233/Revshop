import React from "react";
import RegisterComponent from "../Components/registerComponent";

const RegisterPage: React.FC = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <RegisterComponent />
        </div>
    );
};

export default RegisterPage;