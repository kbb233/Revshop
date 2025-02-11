import React, { useEffect, useState } from "react";
import BuyerNavBarComponent from "../Components/BuyerNavBarComponent";
import cartService from "../Service/cartService";
import orderService from "../Service/orderService";

const ViewCartBuyerPage : React.FC=()=>{
    const [cart, setCart] = useState<any[]>([]);
    const [showOrderForm, setShowOrderForm] = useState(false);
    const [shippingAddress, setShippingAddress] = useState("");
    const [billingAddress, setBillingAddress] = useState("");
    const buyer_id = localStorage.getItem("buyer_id");

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

    const getTotalAmount = () => {
        return cart.reduce((sum, product) => sum + product.price * product.quantity, 0);
    };

    const handleOrderPlacement = async () => {
        if (!shippingAddress || !billingAddress) {
            alert("Please enter shipping and billing addresses.");
            return;
        }

        const orderData = {
            buyer_id,
            shippingAddress,
            billingAddress,
            orderDate: new Date().toISOString().replace("Z",""),
            totalAmount:getTotalAmount(),
            orderItems: cart.map((item) => ({
                product_id: item.id,
                quantity: item.quantity,
                price: item.price,
            })),
          };
          console.log(orderData.orderDate);
        try {
        const response = await orderService.placeOrder(orderData);
        alert("Order placed successfully!");
        localStorage.removeItem("shopping_cart");
        setCart([]);
        setShowOrderForm(false);
        } catch (error) {
        console.error("Error placing order:", error);
        alert("Failed to place order. Please try again.");
        }
    };

    return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
    <BuyerNavBarComponent />
    <h2 style={{ textAlign: "center", margin: "20px 0" }}>Your Cart</h2>
    {cart.length === 0 ? (
                <p style={{ textAlign: "center", marginTop: "20px" }}>Your cart is empty</p>
            ) : (
                <div style={{ maxWidth: "800px", margin: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                            <tr style={{ borderBottom: "2px solid #ddd", textAlign: "left" }}>
                                <th style={{ padding: "10px" }}>Product</th>
                                <th style={{ padding: "10px" }}>Price</th>
                                <th style={{ padding: "10px" }}>Quantity</th>
                                <th style={{ padding: "10px" }}>Total</th>
                                <th style={{ padding: "10px" }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((product) => (
                                <tr key={product.id} style={{ borderBottom: "1px solid #ddd" }}>
                                    <td style={{ padding: "10px" }}>{product.name}</td>
                                    <td style={{ padding: "10px" }}>${product.price.toFixed(2)}</td>
                                    <td style={{ padding: "10px" }}>
                                        <input 
                                            type="number" 
                                            value={product.quantity} 
                                            onChange={(e) => handleUpdateQuantity(product.id, parseInt(e.target.value))}
                                            style={{ width: "50px", textAlign: "center" }} 
                                        />
                                    </td>
                                    <td style={{ padding: "10px" }}>${(product.price * product.quantity).toFixed(2)}</td>
                                    <td style={{ padding: "10px" }}>
                                        <button 
                                            onClick={() => handleRemove(product.id)} 
                                            style={{ backgroundColor: "red", color: "white", padding: "5px 10px", border: "none", borderRadius: "5px", cursor: "pointer" }}
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div style={{ textAlign: "right", marginTop: "20px", fontSize: "18px", fontWeight: "bold" }}>
                        Total Amount: ${getTotalAmount()}
                    </div>

                    <div style={{ textAlign: "right", marginTop: "20px" }}>
                        <button
                            onClick={() => setShowOrderForm(true)}
                            style={{ backgroundColor: "green", color: "white", padding: "10px 20px", border: "none", borderRadius: "5px", cursor: "pointer" }}
                        >
                            Place Order
                        </button>
                        </div>

                        {showOrderForm && (
                        <div style={{
                            position: "fixed",
                            top: "0", left: "0", width: "100%", height: "100%",
                            backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center"
                        }}>
                            <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "8px", width: "400px" }}>
                                <h3 style={{ marginBottom: "10px" }}>Enter Order Details</h3>
                                <label>Shipping Address:</label>
                                <input
                                    type="text"
                                    value={shippingAddress}
                                    onChange={(e) => setShippingAddress(e.target.value)}
                                    style={{ width: "100%", padding: "8px", margin: "5px -8px", borderRadius: "5px" }}
                                />
                                <label>Billing Address:</label>
                                <input
                                    type="text"
                                    value={billingAddress}
                                    onChange={(e) => setBillingAddress(e.target.value)}
                                    style={{ width: "100%", padding: "8px", margin: "5px -8px", borderRadius: "5px" }}
                                />
                                <p>Total Amount: <strong>${getTotalAmount()}</strong></p>

                                <div style={{ textAlign: "right", marginTop: "10px" }}>
                                    <button
                                        onClick={() => setShowOrderForm(false)}
                                        style={{ marginRight: "10px", padding: "8px 15px", border: "none", borderRadius: "5px", cursor: "pointer" }}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleOrderPlacement}
                                        style={{ backgroundColor: "blue", color: "white", padding: "8px 15px", border: "none", borderRadius: "5px", cursor: "pointer" }}
                                    >
                                        Confirm Order
                                    </button>
                                </div>
                            </div>
                        </div>
                        )}
                </div>
            )}
        </div>
    );
}

export default ViewCartBuyerPage;