import React from "react";
import { useNavigate } from "react-router-dom";

const BuyerNavBarComponent: React.FC = () => {
  const navigate = useNavigate();

  const navStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    padding: "10px",
    backgroundColor: "#007bff",
    color: "white",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer"
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: "transparent",
    border: "none",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
    padding: "10px"
  };

  return (
    <div style={navStyle}>
      <button style={buttonStyle} onClick={() => navigate("/viewProductBuyer")}>Products</button>
      <button style={buttonStyle} onClick={() => navigate("/viewCartBuyer")}>Cart</button>
      <button style={buttonStyle} onClick={() => navigate("/viewOrderBuyer")}>Orders</button>
      <button style={buttonStyle} onClick={() => navigate("/viewFavoriteBuyer")}>Favorites</button>
    </div>
  );
};

export default BuyerNavBarComponent;
