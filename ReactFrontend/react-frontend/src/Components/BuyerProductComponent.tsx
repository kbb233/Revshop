import React, { useState } from "react";
import { addToCart, addToFavorites } from "../Service/productService";
import cartService from "../Service/cartService";

interface BuyerProductProps {
  product: {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    discountedPrice: number;
    imageUrl: string;
    reviews: { product_id: number;buyer_id:number; comment: string; rating: number }[];
  };
}

const BuyerProductComponent: React.FC<BuyerProductProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    cartService.addToCart(product, quantity);
    alert("Added to cart!");
  };

  const handleAddToFavorites = () => {
    addToFavorites(product.id);
    alert("Added to favorites!");
  };

  return (
    <div style={{ border: "1px solid #ddd", padding: "10px", borderRadius: "5px", textAlign: "center" }}>
      <img
        src={`http://localhost:8080/${product.imageUrl}`}
        alt={product.name}
        style={{ width: "100px", height: "100px", objectFit: "contain", borderRadius: "8px" }}
      />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p style={{ fontWeight: "bold" }}>Category: {product.category}</p>

      {/* Price Display with Discount Logic */}
      <p>
        {product.discountedPrice < product.price ? (
          <>
            <span style={{ textDecoration: "line-through", color: "gray" }}>${product.price}</span>{" "}
            <span style={{ color: "red", fontWeight: "bold" }}>${product.discountedPrice}</span>
          </>
        ) : (
          <span>${product.price}</span>
        )}
      </p>

      {/* Quantity Selector */}
      <div>
        <label>Quantity:</label>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          style={{ width: "40px", marginLeft: "5px" }}
        />
      </div>

      {/* Action Buttons */}
      <div style={{ marginTop: "10px" }}>
        <button onClick={handleAddToCart} style={{ marginRight: "5px", padding: "5px", cursor: "pointer" }}>
          🛒 Add to Cart
        </button>
        <button onClick={handleAddToFavorites} style={{ padding: "5px", cursor: "pointer" }}>❤️ Favorite</button>
      </div>

      {/* Reviews Section */}
      <div style={{ marginTop: "10px" }}>
        <h4>Reviews</h4>
        {product.reviews.length > 0 ? (
          product.reviews.map((review, index) => (
            <p key={index}>
              <strong>Buyer {review.buyer_id}:</strong> {review.comment} ({review.rating}/5)
            </p>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default BuyerProductComponent;
