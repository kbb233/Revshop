package com.weiyi.Revshop.DTO;

import com.weiyi.Revshop.entity.Review;

public class ReviewDTO {
    private Long id;
    private String reviewerName;
    private String comment;
    private int rating;

    public ReviewDTO(Review review) {
        this.id = review.getId();
        this.reviewerName = review.getBuyer().getUser().getEmail(); 
        this.comment = review.getComment();
        this.rating = review.getRating();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getReviewerName() {
        return reviewerName;
    }

    public void setReviewerName(String reviewerName) {
        this.reviewerName = reviewerName;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }
}
