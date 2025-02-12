package com.weiyi.Revshop.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.weiyi.Revshop.DTO.ReviewDTO;
import com.weiyi.Revshop.entity.BuyerProfile;
import com.weiyi.Revshop.entity.Product;
import com.weiyi.Revshop.entity.Review;
import com.weiyi.Revshop.repository.BuyerProfileRepository;
import com.weiyi.Revshop.repository.ProductRepository;
import com.weiyi.Revshop.service.ReviewService;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {
    
    private final ReviewService reviewService;
    private final BuyerProfileRepository buyerProfileRepository;
    private final ProductRepository productRepository;

    public ReviewController(ReviewService reviewService, BuyerProfileRepository buyerProfileRepository, ProductRepository productRepository) {
        this.reviewService = reviewService;
        this.buyerProfileRepository = buyerProfileRepository;
        this.productRepository = productRepository;
    }
    //new review
    @PostMapping("/add")
    public ResponseEntity<ReviewDTO> addReview(@RequestBody ReviewDTO reviewDTO) {
        System.out.println(reviewDTO);
        BuyerProfile buyer = buyerProfileRepository.findBuyerProfileById(reviewDTO.getBuyer_id()).get();
        Product product = productRepository.findById(reviewDTO.getProduct_id()).get();
        Review review = new Review();
        review.setBuyer(buyer);
        review.setProduct(product);
        review.setComment(reviewDTO.getComment());
        review.setRating(reviewDTO.getRating());
        Review savedReview = reviewService.addReview(review);
        return ResponseEntity.ok(new ReviewDTO(savedReview.getProduct().getId(),savedReview.getBuyer().getId(),savedReview.getComment(),savedReview.getRating()));
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<ReviewDTO>> getReviewsByProductId(@PathVariable Long productId) {
        List<ReviewDTO> reviews = reviewService.getReviewsByProductId(productId)
                .stream()
                .map(review-> new ReviewDTO(
                    review.getProduct().getId(),
                    review.getBuyer().getId(),
                    review.getComment(),
                    review.getRating()
                    ))
                .collect(Collectors.toList());
        return ResponseEntity.ok(reviews);
    }

}
