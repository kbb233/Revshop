import React from "react";

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
      <button
        onClick={() => onRemoveFavorite(product.id)}
        style={{ backgroundColor: "red", color: "white", padding: "8px", border: "none", borderRadius: "5px" }}
      >
        Remove from Favorite
      </button>
    </div>
  );
};

export default BuyerFavoriteComponent;
