package com.weiyi.Revshop.DTO;

public class ReviewDTO {
    private Long product_id;
    private Long buyer_id;
    private String comment;
    private int rating;


    public ReviewDTO(Long product_id, Long buyer_id, String comment, int rating) {
        this.product_id = product_id;
        this.buyer_id = buyer_id;
        this.comment = comment;
        this.rating = rating;
    }

    public Long getProduct_id() {
        return this.product_id;
    }

    public void setProduct_id(Long product_id) {
        this.product_id = product_id;
    }

    public Long getBuyer_id() {
        return this.buyer_id;
    }

    public void setBuyer_id(Long buyer_id) {
        this.buyer_id = buyer_id;
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
