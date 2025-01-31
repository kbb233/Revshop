package com.weiyi.Revshop.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.weiyi.Revshop.entity.BuyerProfile;
import com.weiyi.Revshop.repository.BuyerProfileRepository;

@Service
public class BuyerProfileService {
    @Autowired
    private BuyerProfileRepository buyerProfileRepository;

    public BuyerProfile saveBuyerProfile(BuyerProfile buyerProfile) {
        return buyerProfileRepository.save(buyerProfile);
    }

    public BuyerProfile getBuyerProfileByUserId(Long userId) {
        return buyerProfileRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Buyer profile not found"));
    }
}
