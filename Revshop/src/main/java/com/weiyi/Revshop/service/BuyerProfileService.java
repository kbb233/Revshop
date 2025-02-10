package com.weiyi.Revshop.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.weiyi.Revshop.entity.BuyerProfile;
import com.weiyi.Revshop.entity.User;
import com.weiyi.Revshop.repository.BuyerProfileRepository;
import com.weiyi.Revshop.repository.UserRepository;

@Service
public class BuyerProfileService {
    @Autowired
    private BuyerProfileRepository buyerProfileRepository;

    @Autowired
    private UserRepository userRepository;

    public BuyerProfile saveBuyerProfile(BuyerProfile buyerProfile) {
        return buyerProfileRepository.save(buyerProfile);
    }

    public BuyerProfile getBuyerProfileByUserId(Long userId) {
        return buyerProfileRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Buyer profile not found"));
    }

    public BuyerProfile createBuyerProfile(Long userId) {
        // Check if user exists
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Check if buyer profile already exists
        if (buyerProfileRepository.findByUserId(userId).isPresent()) {
            throw new RuntimeException("Buyer profile already exists");
        }

        // Create and save new buyer profile
        BuyerProfile newProfile = new BuyerProfile();
        newProfile.setUser(user);
        return buyerProfileRepository.save(newProfile);
    }
}
