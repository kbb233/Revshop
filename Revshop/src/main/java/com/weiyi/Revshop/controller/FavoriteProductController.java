package com.weiyi.Revshop.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.weiyi.Revshop.entity.FavoriteProduct;
import com.weiyi.Revshop.service.FavoriteProductService;

@RestController
@RequestMapping("/api/favorites")
public class FavoriteProductController {
    
    @Autowired
    private FavoriteProductService favoriteProductService;

    @PostMapping
    public ResponseEntity<FavoriteProduct> addFavorite(@RequestBody FavoriteProduct favoriteProduct) {
        FavoriteProduct savedFavorite = favoriteProductService.addFavorite(favoriteProduct);
        return ResponseEntity.ok(savedFavorite);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removeFavorite(@PathVariable Long id) {
        favoriteProductService.removeFavorite(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/buyer/{buyerId}")
    public ResponseEntity<List<FavoriteProduct>> getFavoritesByBuyerId(@PathVariable Long buyerId) {
        List<FavoriteProduct> favorites = favoriteProductService.getFavoritesByBuyerId(buyerId);
        return ResponseEntity.ok(favorites);
    }
}
