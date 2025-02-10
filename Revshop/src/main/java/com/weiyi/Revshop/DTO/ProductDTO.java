package com.weiyi.Revshop.DTO;

import java.util.List;
import java.util.stream.Collectors;

import com.weiyi.Revshop.entity.Product;

public class ProductDTO {
    private Long id;
    private String name;
    private String description;
    private double price;
    private String category;
    private double discountedPrice;
    private int quantity;
    private int threshold;
    private String imageUrl;
    private Long sellerId;
    private List<ReviewDTO> reviews;
    
    public ProductDTO(Product product) {
        this.id = product.getId();
        this.name = product.getName();
        this.description = product.getDescription();
        this.price = product.getPrice();
        this.category = product.getCategory();
        this.discountedPrice = product.getDiscountedPrice();
        this.quantity = product.getQuantity();
        this.threshold = product.getThreshold();
        this.imageUrl = product.getImageUrl();
        this.sellerId = product.getSeller().getId(); 
        this.reviews = product.getReviews().stream()
                .map(ReviewDTO::new)  
                .collect(Collectors.toList());
    }

    public List<ReviewDTO> getReviews() {
        return this.reviews;
    }

    public void setReviews(List<ReviewDTO> reviews) {
        this.reviews = reviews;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getPrice() {
        return this.price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getCategory() {
        return this.category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public double getDiscountedPrice() {
        return this.discountedPrice;
    }

    public void setDiscountedPrice(double discountedPrice) {
        this.discountedPrice = discountedPrice;
    }

    public int getQuantity() {
        return this.quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public int getThreshold() {
        return this.threshold;
    }

    public void setThreshold(int threshold) {
        this.threshold = threshold;
    }

    public String getImageUrl() {
        return this.imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Long getSellerId() {
        return this.sellerId;
    }

    public void setSellerId(Long sellerId) {
        this.sellerId = sellerId;
    }

}
