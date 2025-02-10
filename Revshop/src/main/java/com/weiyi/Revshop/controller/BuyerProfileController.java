package com.weiyi.Revshop.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.weiyi.Revshop.DTO.BuyerProfileDTO;
import com.weiyi.Revshop.entity.BuyerProfile;
import com.weiyi.Revshop.service.BuyerProfileService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/buyers")
public class BuyerProfileController {
    
    @Autowired
    private BuyerProfileService buyerProfileService;

    //update profile
    @PostMapping("/profile/create")
    public ResponseEntity<BuyerProfileDTO> saveBuyerProfile(@RequestBody BuyerProfileDTO buyerProfileDTO) {
        BuyerProfile createdProfile = buyerProfileService.createBuyerProfile(buyerProfileDTO.getUserId());
        return ResponseEntity.ok(new BuyerProfileDTO(createdProfile.getId(),createdProfile.getUser().getId()));
    }

    @GetMapping("/profile/{userId}")
    public ResponseEntity<?> getBuyerProfileByUserId(@PathVariable Long userId) {
        BuyerProfile profile = buyerProfileService.getBuyerProfileByUserId(userId);
        if (profile != null && profile.getId() != null) {
        BuyerProfileDTO profileDTO = new BuyerProfileDTO(profile.getId(),profile.getUser().getId());
        return ResponseEntity.ok(profileDTO);
        }
        return ResponseEntity.status(404).body("Seller profile incomplete. Please add business details.");
    }
}
