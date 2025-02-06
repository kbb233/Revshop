import React from "react";
import CreateProductComponent from "../Components/CreateProductComponent";
import NavbarComponent from "../Components/NavbarComponent";


const CreateProductPage: React.FC = () => {
    return (
        <div>
            <NavbarComponent />
            <div className="container mx-auto p-4">
                <h2 className="text-xl font-bold mb-4">Create a New Product</h2>
                <CreateProductComponent />
            </div>
        </div>
    );
};

export default CreateProductPage;