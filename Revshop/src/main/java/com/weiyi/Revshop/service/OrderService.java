package com.weiyi.Revshop.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.weiyi.Revshop.DTO.OrderItemDTO;
import com.weiyi.Revshop.DTO.OrderRequest;
import com.weiyi.Revshop.entity.BuyerProfile;
import com.weiyi.Revshop.entity.Order;
import com.weiyi.Revshop.entity.OrderItem;
import com.weiyi.Revshop.repository.BuyerProfileRepository;
import com.weiyi.Revshop.repository.OrderRepository;
import com.weiyi.Revshop.repository.ProductRepository;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final BuyerProfileRepository buyerProfileRepository;
    private final ProductRepository productRepository;

    public OrderService(OrderRepository orderRepository, BuyerProfileRepository buyerProfileRepository, ProductRepository productRepository) {
        this.orderRepository = orderRepository;
        this.buyerProfileRepository = buyerProfileRepository;
        this.productRepository = productRepository;
    }

    @Transactional
    public OrderRequest createOrder(OrderRequest orderRequest) {
        BuyerProfile buyer = buyerProfileRepository.findById(orderRequest.getBuyer_id())
                .orElseThrow(() -> new RuntimeException("Buyer profile not found"));

        Order order = new Order();
        order.setBuyer(buyer);
        order.setShippingAddress(orderRequest.getShippingAddress());
        order.setBillingAddress(orderRequest.getBillingAddress());
        order.setOrderDate(orderRequest.getOrderDate());
        order.setTotalAmount(orderRequest.getTotalAmount());

        List<OrderItem> orderItems = orderRequest.getOrderItems().stream().map(dto -> {
            OrderItem item = new OrderItem();
            item.setProduct(productRepository.findById(dto.getProduct_id())
                    .orElseThrow(() -> new RuntimeException("Product not found")));
            item.setQuantity(dto.getQuantity());
            item.setPrice(dto.getPrice());
            item.setOrder(order);
            return item;
        }).collect(Collectors.toList());

        order.setOrderItems(orderItems);
        orderRepository.save(order);

        return convertToDTO(order);
    }

    public List<OrderRequest> getOrdersByBuyer(Long buyerId) {
        return orderRepository.findByBuyerId(buyerId).stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    private OrderRequest convertToDTO(Order order) {
        List<OrderItemDTO> items = order.getOrderItems().stream()
        .map(item -> {
        OrderItemDTO dto= new OrderItemDTO(
                item.getProduct().getId(),
                item.getQuantity(),
                item.getPrice()
        );
        dto.setProduct_name(item.getProduct().getName());
        return dto;
    }).collect(Collectors.toList());

        return new OrderRequest(
                order.getBuyer().getId(),
                order.getShippingAddress(),
                order.getBillingAddress(),
                order.getOrderDate(),
                order.getTotalAmount(),
                items
        );
    }
}
