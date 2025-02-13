package com.weiyi.Revshop.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.weiyi.Revshop.entity.FavoriteProduct;

public interface  FavoriteProductRepository extends JpaRepository<FavoriteProduct, Long>{
    List<FavoriteProduct> findByBuyerId(Long buyerId);
    Optional<FavoriteProduct> findByBuyerIdAndProductId(Long buyerId, Long productId);
    boolean existsByBuyerIdAndProductId(Long buyerId, Long productId);
}
