package com.weiyi.Revshop.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.weiyi.Revshop.entity.FavoriteProduct;
import com.weiyi.Revshop.repository.FavoriteProductRepository;

@Service
public class FavoriteProductService {
    
    @Autowired
    private FavoriteProductRepository favoriteProductRepository;

    public FavoriteProduct addFavorite(FavoriteProduct favoriteProduct) {
        if (favoriteProductRepository.existsByBuyerIdAndProductId(
                favoriteProduct.getBuyer().getId(), favoriteProduct.getProduct().getId())) {
            throw new RuntimeException("Product already in favorites");
        }
        return favoriteProductRepository.save(favoriteProduct);
    }

    public void removeFavorite(Long id) {
        favoriteProductRepository.deleteById(id);
    }

    public List<FavoriteProduct> getFavoritesByBuyerId(Long buyerId) {
        return favoriteProductRepository.findByBuyerId(buyerId);
    }
}
