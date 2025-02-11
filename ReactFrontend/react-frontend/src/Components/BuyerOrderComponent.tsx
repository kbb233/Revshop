import React from "react";

interface OrderItemDTO {
    product_id: number;
    quantity: number;
    price: number;
    product_name:string;
}

interface OrderRequest {
    buyer_id: number;
    shippingAddress: string;
    billingAddress: string;
    orderDate: string;
    totalAmount: number;
    orderItems: OrderItemDTO[];
}

interface BuyerOrderComponentProps {
order: OrderRequest;
}

const BuyerOrderComponent: React.FC<BuyerOrderComponentProps> = ({ order }) => {
    return (
      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "16px",
          margin: "12px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <h3 style={{ marginBottom: "8px" }}>Buyer ID: {order.buyer_id}</h3>
        <p style={{ marginBottom: "8px" }}>
          <strong>Order Date:</strong> {new Date(order.orderDate).toLocaleString()}
        </p>
        <p style={{ marginBottom: "8px" }}>
          <strong>Total Amount:</strong> ${order.totalAmount.toFixed(2)}
        </p>
        <div>
          <h4 style={{ marginBottom: "8px" }}>Order Items:</h4>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {order.orderItems.map((item, index) => (
              <li
                key={index}
                style={{
                  borderBottom: "1px solid #ccc",
                  paddingBottom: "8px",
                  marginBottom: "8px",
                }}
              >
                <p style={{ margin: 0 }}>
                    <strong>{item.product_name}</strong> : 
                    {item.quantity} × ${item.price.toFixed(2)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };
  
  export default BuyerOrderComponent;