import React, { useState } from "react";

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
  const [reviewProductId, setReviewProductId] = useState<number | null>(null);
  const [reviewProductName, setReviewProductName] = useState<string | null>(null);
  const [reviewText, setReviewText] = useState<string>("");
  const [rating, setRating] = useState<number>(5);
  const [hover, setHover] = useState(0);

  const handleReviewSetting = (product_id: number,product_name: string )=>{
    setReviewProductId(product_id);
    setReviewProductName(product_name);
  };

  const handleSubmitReview = () => {
    if (reviewProductId === null) return;

    const reviewData = {
        product_id: reviewProductId,
        buyer_id: order.buyer_id,
        rating,
        comment: reviewText,
    };
    console.log(reviewData);
    fetch("http://localhost:8080/api/reviews/add", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
  })
      .then((response) => response.json())
      .then((data) => {
          console.log("Review submitted successfully:", data);
          setReviewProductId(null);
          setReviewText("");
          setRating(5);
      })
      .catch((error) => console.error("Error submitting review:", error));
};


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
                <button
                  style={{
                      marginTop: "5px",
                      padding: "5px 10px",
                      backgroundColor: "#007bff",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                  }}onClick={() => handleReviewSetting(item.product_id,item.product_name)}>
                  Write Review
                </button>
              </li>
            ))}
          </ul>
        </div>
        {reviewProductId !== null && (
                <div
                    style={{
                        marginTop: "10px",
                        padding: "10px",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        backgroundColor: "#f8f8f8",
                    }}
                >
                    <h4>Write a Review for {reviewProductName}</h4>
                    <textarea
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        placeholder="Write your review here..."
                        style={{ width: "100%", height: "60px", marginBottom: "8px" }}
                    />
                    <br />
                    <div>
                      {[...Array(5)].map((_, index) => {
                        const starValue = index + 1;
                        return (
                          <span
                            key={starValue}
                            style={{
                              cursor: 'pointer',
                              color: starValue <= (hover || rating) ? 'gold' : 'gray',
                              fontSize: '24px',
                            }}
                            onClick={() => setRating(starValue)}
                            onMouseEnter={() => setHover(starValue)}
                            onMouseLeave={() => setHover(0)}
                          >
                            ★
                          </span>
                        );
                      })}
                      <p>Your Rating : {rating ? rating : 'N/A'}</p>
                    </div>
                    <br />
                    <button
                        style={{
                            marginTop: "5px",
                            padding: "5px 10px",
                            backgroundColor: "#28a745",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                        }}
                        onClick={handleSubmitReview}
                    >
                        Submit Review
                    </button>
                    <button
                        style={{
                            marginLeft: "10px",
                            padding: "5px 10px",
                            backgroundColor: "#dc3545",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                        }}
                        onClick={() => setReviewProductId(null)}
                    >
                        Cancel
                    </button>
                </div>
            )}
      </div>
    );
  };
  
  export default BuyerOrderComponent;