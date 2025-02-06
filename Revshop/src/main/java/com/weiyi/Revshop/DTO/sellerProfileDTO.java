package com.weiyi.Revshop.DTO;

public class sellerProfileDTO {
    private Long id;
    private String businessName;
    private String businessAddress;

    public sellerProfileDTO(Long id, String businessName, String businessAddress) {
        this.id = id;
        this.businessName = businessName;
        this.businessAddress = businessAddress;
    }

    public Long getId() {
        return id;
    }

    public String getBusinessName() {
        return businessName;
    }

    public String getBusinessAddress() {
        return businessAddress;
    }
}
