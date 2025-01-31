package com.weiyi.Revshop.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.weiyi.Revshop.entity.Review;

public interface  ReviewRepository extends JpaRepository<Review, Long>{
    List<Review> findByProductId(Long productId);
    List<Review> findByBuyerId(Long buyerId);
}
