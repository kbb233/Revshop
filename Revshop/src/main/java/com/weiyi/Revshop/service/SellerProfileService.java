package com.weiyi.Revshop.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.weiyi.Revshop.entity.SellerProfile;
import com.weiyi.Revshop.repository.SellerProfileRepository;

@Service
public class SellerProfileService {

    @Autowired
    private SellerProfileRepository sellerProfileRepository;

    public SellerProfile saveSellerProfile(SellerProfile sellerProfile) {
        return sellerProfileRepository.save(sellerProfile);
    }

    public SellerProfile getSellerProfileByUserId(Long userId) {
        return sellerProfileRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Seller profile not found"));
    }
}
