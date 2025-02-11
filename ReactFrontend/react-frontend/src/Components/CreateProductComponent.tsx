import React, { useState } from "react";
import { createProduct } from "../Service/createProductService";

const CreateProductComponent: React.FC = () => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        discountedPrice: "",
        quantity: "",
        threshold: "",
        sellerId: localStorage.getItem("seller_id")||""
    });
    const [image, setImage] = useState<File | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem("jwt");
        console.log(localStorage.getItem("seller_id"));
        if (!token) {
            console.error("User is not authenticated!");
            return;
        }

        const productData = new FormData();
        productData.append("name", formData.name);
        productData.append("description", formData.description);
        productData.append("price", formData.price);
        productData.append("category", formData.category);
        productData.append("discountedPrice", formData.discountedPrice);
        productData.append("quantity", formData.quantity);
        productData.append("threshold", formData.threshold);
        productData.append("seller_id", formData.sellerId);
        if (image) {
            productData.append("image", image); // Append image file
        }

        try {
            for (let [key, value] of productData.entries()) {
                console.log(key, value);
            }
            
            const response = await createProduct(productData, token);
            console.log("Product created successfully:", response);
            alert("Product added successfully!");
        } catch (error) {
            alert("Error adding product!");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} required />
            <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
            <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
            <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} required />
            <input type="number" name="discountedPrice" placeholder="Discounted Price" value={formData.discountedPrice} onChange={handleChange} required />
            <input type="number" name="quantity" placeholder="Quantity" value={formData.quantity} onChange={handleChange} required />
            <input type="number" name="threshold" placeholder="Stock Threshold" value={formData.threshold} onChange={handleChange} required />
            
            {/* Image Upload Field */}
            <input type="file" accept="image/*" onChange={handleImageChange} required />

            <button type="submit">Create Product</button>
        </form>
    );
};

export default CreateProductComponent;
