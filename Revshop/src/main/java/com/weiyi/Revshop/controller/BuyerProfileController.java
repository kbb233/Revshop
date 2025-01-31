package com.weiyi.Revshop.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.weiyi.Revshop.entity.BuyerProfile;
import com.weiyi.Revshop.service.BuyerProfileService;

@RestController
@RequestMapping("/api/buyers")
public class BuyerProfileController {
    
    @Autowired
    private BuyerProfileService buyerProfileService;

    //update profile
    @PostMapping
    public ResponseEntity<BuyerProfile> saveBuyerProfile(@RequestBody BuyerProfile buyerProfile) {
        BuyerProfile savedProfile = buyerProfileService.saveBuyerProfile(buyerProfile);
        return ResponseEntity.ok(savedProfile);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<BuyerProfile> getBuyerProfileByUserId(@PathVariable Long userId) {
        BuyerProfile profile = buyerProfileService.getBuyerProfileByUserId(userId);
        return ResponseEntity.ok(profile);
    }
}
