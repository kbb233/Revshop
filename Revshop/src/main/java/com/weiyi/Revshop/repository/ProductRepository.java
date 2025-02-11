package com.weiyi.Revshop.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.weiyi.Revshop.entity.Product;

public interface  ProductRepository extends JpaRepository<Product, Long>{
    List<Product> findBySellerId(Long sellerId);
    Optional<Product> findById(Long id);
    List<Product> findByCategory(String category);
    List<Product> findByNameContainingIgnoreCase(String keyword);

    @Query("SELECT p FROM Product p WHERE p.price BETWEEN :minPrice AND :maxPrice")
    List<Product> findProductsByPriceRange(@Param("minPrice") double minPrice, @Param("maxPrice") double maxPrice);
}
