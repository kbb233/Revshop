import React, { useState } from "react";
import cartService from "../Service/cartService";

interface FavoriteProductProps {
  product: {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    discountedPrice: number;
    quantity: number;
    imageUrl: string;
  };
  onRemoveFavorite: (productId: number) => void;
}

const BuyerFavoriteComponent: React.FC<FavoriteProductProps> = ({ product, onRemoveFavorite }) => {
  const baseURL = "http://localhost:8080/";
  const [quantity, setQuantity] = useState(1);
  const handleAddToCart = () => {
      cartService.addToCart(product, quantity);
      alert("Added to cart!");
    };

  return (
    <div style={{ border: "1px solid #ccc", padding: "15px", margin: "10px", borderRadius: "8px" }}>
      <img
        src={`${baseURL}${product.imageUrl}`}
        alt="Product"
        style={{ width: "100px", height: "100px", objectFit: "contain", borderRadius: "8px" }}
      />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>Category: {product.category}</p>
      <p>
        Price:{" "}
        {product.discountedPrice < product.price ? (
          <>
            <span style={{ textDecoration: "line-through", color: "gray" }}>${product.price}</span>
            <span style={{ color: "red", fontWeight: "bold", marginLeft: "8px" }}>
              ${product.discountedPrice}
            </span>
          </>
        ) : (
          <span>${product.price}</span>
        )}
      </p>

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
        <br/>
      <button onClick={handleAddToCart} style={{ marginRight: "5px", padding: "5px", cursor: "pointer"}}>
          🛒 Add to Cart
        </button>
      <button
        onClick={() => onRemoveFavorite(product.id)}
        style={{ marginRight: "5px", padding: "5px", cursor: "pointer"  }}
      >
        ❌ Remove from Favorite
      </button>
    </div>
  );
};

export default BuyerFavoriteComponent;
