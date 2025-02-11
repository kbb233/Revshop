package com.weiyi.Revshop.DTO;

import java.time.LocalDateTime;
import java.util.List;

public class OrderRequest {
    private Long buyer_id;
    private String shippingAddress;
    private String billingAddress;
    private LocalDateTime orderDate;
    private double totalAmount;
    private List<OrderItemDTO> orderItems;


    public OrderRequest(Long buyer_id, String shippingAddress, String billingAddress, LocalDateTime orderDate, double totalAmount, List<OrderItemDTO> orderItems) {
        this.buyer_id = buyer_id;
        this.shippingAddress = shippingAddress;
        this.billingAddress = billingAddress;
        this.orderDate = orderDate;
        this.totalAmount = totalAmount;
        this.orderItems = orderItems;
    }

    public Long getBuyer_id() {
        return this.buyer_id;
    }

    public void setBuyer_id(Long buyer_id) {
        this.buyer_id = buyer_id;
    }

    public String getShippingAddress() {
        return this.shippingAddress;
    }

    public void setShippingAddress(String shippingAddress) {
        this.shippingAddress = shippingAddress;
    }

    public String getBillingAddress() {
        return this.billingAddress;
    }

    public void setBillingAddress(String billingAddress) {
        this.billingAddress = billingAddress;
    }

    public LocalDateTime getOrderDate() {
        return this.orderDate;
    }

    public void setOrderDate(LocalDateTime orderDate) {
        this.orderDate = orderDate;
    }

    public double getTotalAmount() {
        return this.totalAmount;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public List<OrderItemDTO> getOrderItems() {
        return this.orderItems;
    }

    public void setOrderItems(List<OrderItemDTO> orderItems) {
        this.orderItems = orderItems;
    }

    
}
