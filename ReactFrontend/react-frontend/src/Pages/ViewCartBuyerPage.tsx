import React, { useEffect, useState } from "react";
import BuyerNavBarComponent from "../Components/BuyerNavBarComponent";
import cartService from "../Service/cartService";

const ViewCartBuyerPage : React.FC=()=>{
    const [cart, setCart] = useState<any[]>([]);


    useEffect(() => {
        setCart(cartService.getCart());
      }, []);


    const handleRemove = (productId: number) => {
        cartService.removeFromCart(productId);
        setCart(cartService.getCart());
      };
    
    const handleUpdateQuantity = (productId: number, quantity: number) => {
        cartService.updateCartQuantity(productId, quantity);
        setCart(cartService.getCart());
      };
    
    return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
    <BuyerNavBarComponent />
    <h2 style={{ textAlign: "center", margin: "20px 0" }}>Your Cart</h2>
        {cart.length === 0 ? (
          <p style={{ textAlign: "center", marginTop: "20px" }}>Your cart is empty</p>
        ) : (
          cart.map((product) => (
            <div key={product.id} style={{ border: "1px solid #ddd", padding: "10px", margin: "10px", borderRadius: "8px", display: "flex", justifyContent: "space-between" }}>
              <div>
                <h3>{product.name}</h3>
                <p>${product.price}</p>
                <input 
                  type="number" 
                  value={product.quantity} 
                  onChange={(e) => handleUpdateQuantity(product.id, parseInt(e.target.value))}
                  style={{ width: "50px", marginRight: "10px" }} 
                />
                <button onClick={() => handleRemove(product.id)} style={{ backgroundColor: "red", color: "white", padding: "5px 10px", border: "none", borderRadius: "5px" }}>
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    );
}

export default ViewCartBuyerPage;