package com.weiyi.Revshop.controller;

import java.util.List;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.weiyi.Revshop.DTO.OrderItemDTO;
import com.weiyi.Revshop.DTO.OrderRequest;

import com.weiyi.Revshop.service.OrderService;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    
    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/create")
    public ResponseEntity<?> createOrder(@RequestBody OrderRequest orderRequest) {
        System.out.println("Received Order Request: " + orderRequest);
        System.out.println("Buyer ID: " + orderRequest.getBuyer_id());
        System.out.println("Order Items: " + orderRequest.getOrderItems());

        if (orderRequest.getBuyer_id() == null || orderRequest.getOrderItems().isEmpty()) {
            return ResponseEntity.badRequest().body("Missing buyerId or order items.");
        }
        for (OrderItemDTO item : orderRequest.getOrderItems()) {
        System.out.println("Order Item - Product ID: " + item.getProduct_id());
        if (item.getProduct_id() == null) {
            return ResponseEntity.badRequest().body("Product ID is missing in an order item.");
            }
        }
        return ResponseEntity.ok(orderService.createOrder(orderRequest));
    }

    @GetMapping("/buyer/{buyerId}")
    public ResponseEntity<List<OrderRequest>> getOrdersByBuyer(@PathVariable Long buyerId) {
        return ResponseEntity.ok(orderService.getOrdersByBuyer(buyerId));
    }
}
