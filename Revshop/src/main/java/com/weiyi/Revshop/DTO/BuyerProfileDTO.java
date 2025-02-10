package com.weiyi.Revshop.DTO;

public class BuyerProfileDTO {
    private Long id;
    private Long userId;

    public BuyerProfileDTO() {}

    public BuyerProfileDTO(Long id, Long userId) {
        this.id = id;
        this.userId = userId;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return this.userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

}
