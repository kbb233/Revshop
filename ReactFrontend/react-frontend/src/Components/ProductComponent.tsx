import React, { useState } from "react";

interface ProductProps {
  product: {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    discountedPrice: number;
    quantity: number;
    threshold: number;
    imageUrl: string;
  };
  onEdit: (product: any) => void;
  onDelete: (productId: number) => void;
}

const ProductComponent: React.FC<ProductProps> = ({ product, onEdit, onDelete }) => {
  const [showEditForm, setShowEditForm] = useState(false);
  const [editedProduct, setEditedProduct] = useState({ ...product });
  const baseURL = "http://localhost:8080/"; 

  const handleEdit = () => {
    onEdit(editedProduct);
    setShowEditForm(false);
  };

  return (
    <div className="border p-4 rounded shadow-md bg-white">
      <img 
      src={`${baseURL}${product.imageUrl}`}
      style={{
        width: "100px",
        height: "100px",
        objectFit: "contain",
        borderRadius: "8px",
      }}
      />
      <h3 className="text-lg font-bold">Product Name: {product.name}</h3>
      <p className="text-sm text-gray-600">Product Description: {product.description}</p>
      <p className="text-sm font-semibold">Category: {product.category}</p>

      <p className="text-sm">
        Price:{" "}
        {product.discountedPrice < product.price ? (
          <span>
            <span style={{ textDecoration: "line-through", color: "gray" }}>${product.price}</span>{" "}
            <span style={{ color: "red", fontWeight: "bold" }}>${product.discountedPrice}</span>
          </span>
        ) : (
          <span>${product.price}</span>
        )}
      </p>

      <p className="text-sm">Stock: {product.quantity}</p>
      <div className="flex space-x-2 mt-2">
        <button
          onClick={() => setShowEditForm(true)}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(product.id)}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
      </div>

      {showEditForm && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded shadow-lg w-96 relative">
            <h4 className="text-md font-semibold mb-3">Edit Product</h4>
            <input
              type="text"
              value={editedProduct.name}
              onChange={(e) => setEditedProduct({ ...editedProduct, name: e.target.value })}
              className="border p-1 rounded w-full mb-2"
              placeholder="Product Name"
            />
            <input
              type="text"
              value={editedProduct.description}
              onChange={(e) => setEditedProduct({ ...editedProduct, description: e.target.value })}
              className="border p-1 rounded w-full mb-2"
              placeholder="Description"
            />
            <input
              type="number"
              value={editedProduct.price}
              onChange={(e) => setEditedProduct({ ...editedProduct, price: parseFloat(e.target.value) })}
              className="border p-1 rounded w-full mb-2"
              placeholder="Price"
            />
            <input
              type="text"
              value={editedProduct.category}
              onChange={(e) => setEditedProduct({ ...editedProduct, category: e.target.value })}
              className="border p-1 rounded w-full mb-2"
              placeholder="Category"
            />
            <input
              type="number"
              value={editedProduct.discountedPrice}
              onChange={(e) => setEditedProduct({ ...editedProduct, discountedPrice: parseFloat(e.target.value) })}
              className="border p-1 rounded w-full mb-2"
              placeholder="Discounted Price"
            />
            <input
              type="number"
              value={editedProduct.quantity}
              onChange={(e) => setEditedProduct({ ...editedProduct, quantity: parseInt(e.target.value) })}
              className="border p-1 rounded w-full mb-2"
              placeholder="Quantity"
            />
            <input
              type="number"
              value={editedProduct.threshold}
              onChange={(e) => setEditedProduct({ ...editedProduct, threshold: parseInt(e.target.value) })}
              className="border p-1 rounded w-full mb-2"
              placeholder="Threshold"
            />
            <input
              type="text"
              value={editedProduct.imageUrl}
              onChange={(e) => setEditedProduct({ ...editedProduct, imageUrl: e.target.value })}
              className="border p-1 rounded w-full mb-2"
              placeholder="Image URL"
            />
            <div className="flex justify-end space-x-2 mt-2">
              <button onClick={() => setShowEditForm(false)} className="bg-gray-500 text-white px-3 py-1 rounded">
                Cancel
              </button>
              <button onClick={handleEdit} className="bg-green-500 text-white px-3 py-1 rounded">
                Save Changes
              </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default ProductComponent;
