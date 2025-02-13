package com.weiyi.Revshop.controller;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.weiyi.Revshop.DTO.ProductDTO;
import com.weiyi.Revshop.entity.BuyerProfile;
import com.weiyi.Revshop.entity.FavoriteProduct;
import com.weiyi.Revshop.entity.Product;
import com.weiyi.Revshop.repository.BuyerProfileRepository;
import com.weiyi.Revshop.repository.FavoriteProductRepository;
import com.weiyi.Revshop.repository.ProductRepository;

@RestController
@RequestMapping("/api/favorites")
public class FavoriteProductController {
    
    @Autowired
    private FavoriteProductRepository favoriteProductRepository;

    @Autowired
    private BuyerProfileRepository buyerProfileRepository;

    @Autowired
    private ProductRepository productRepository;

    @PostMapping("/add")
    public ResponseEntity<String> addFavorite(@RequestBody Map<String, Long> request) {
        BuyerProfile buyer = buyerProfileRepository.findById(request.get("buyerId"))
                .orElseThrow(() -> new RuntimeException("Buyer not found"));
        Product product = productRepository.findById(request.get("productId"))
                .orElseThrow(() -> new RuntimeException("Product not found"));

        FavoriteProduct favoriteProduct = new FavoriteProduct();
        favoriteProduct.setBuyer(buyer);
        favoriteProduct.setProduct(product);
        favoriteProductRepository.save(favoriteProduct);

        return ResponseEntity.ok("Product added to favorites successfully");
    }

    @GetMapping("/{buyerId}")
    public ResponseEntity<List<ProductDTO>> getFavorites(@PathVariable Long buyerId) {
        List<FavoriteProduct> favoriteProducts = favoriteProductRepository.findByBuyerId(buyerId);
        List<ProductDTO> productDTOs = favoriteProducts.stream()
            .map(favor->new ProductDTO(favor.getProduct()))
            .collect(Collectors.toList());
        System.out.println(productDTOs.get(0).getName());
        return ResponseEntity.ok(productDTOs);
        
    }

    // Remove product from favorites
    @DeleteMapping("/delete/{buyerId}/{productId}")
    public ResponseEntity<String> removeFavorite(@PathVariable Long buyerId, @PathVariable Long productId) {
        FavoriteProduct favoriteProduct = favoriteProductRepository.findByBuyerIdAndProductId(buyerId, productId)
                .orElseThrow(() -> new RuntimeException("Favorite product not found"));

        favoriteProductRepository.delete(favoriteProduct);

        return ResponseEntity.ok("Product removed from favorites successfully");
    }
}
