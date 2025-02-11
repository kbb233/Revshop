package com.weiyi.Revshop.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.weiyi.Revshop.entity.Order;

public interface  OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByBuyerId(Long buyerId);

}
