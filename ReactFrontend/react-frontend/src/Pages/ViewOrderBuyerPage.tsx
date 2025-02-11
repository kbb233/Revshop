import React, { useEffect, useState } from "react";
import BuyerNavBarComponent from "../Components/BuyerNavBarComponent";
import orderService from "../Service/orderService";
import BuyerOrderComponent from "../Components/BuyerOrderComponent";

const ViewOrderBuyerPage : React.FC=()=>{
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const buyerId = localStorage.getItem("buyer_id");
    
    useEffect(() => {
        const loadOrders = async () => {
          try {
            const data = await orderService.getOrdersByBuyer(Number(buyerId));
            setOrders(data);
          } catch (err) {
            console.log(err)
          } finally {
            setLoading(false);
          }
        };
        loadOrders();
      }, [buyerId]);
    
      if (loading) return <p>Loading orders...</p>;


    return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <BuyerNavBarComponent />
            <h2>Your Orders</h2>
                {orders.length > 0 ? (
                    orders.map((order,index) => <BuyerOrderComponent key={index} order={order} />)
                ) : (
                    <p>No orders found.</p>
                )}
            </div>
            );
};

export default ViewOrderBuyerPage;