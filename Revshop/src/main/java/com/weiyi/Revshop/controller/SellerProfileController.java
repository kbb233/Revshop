package com.weiyi.Revshop.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.weiyi.Revshop.entity.SellerProfile;
import com.weiyi.Revshop.service.SellerProfileService;

@RestController
@RequestMapping("/api/sellers")
public class SellerProfileController {
    
    @Autowired
    private SellerProfileService sellerProfileService;

    @PostMapping
    public ResponseEntity<SellerProfile> saveSellerProfile(@RequestBody SellerProfile sellerProfile) {
        SellerProfile savedProfile = sellerProfileService.saveSellerProfile(sellerProfile);
        return ResponseEntity.ok(savedProfile);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<SellerProfile> getSellerProfileByUserId(@PathVariable Long userId) {
        SellerProfile profile = sellerProfileService.getSellerProfileByUserId(userId);
        return ResponseEntity.ok(profile);
    }
}
