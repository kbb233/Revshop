package com.weiyi.Revshop.controller;

import java.security.Principal;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.weiyi.Revshop.entity.SellerProfile;
import com.weiyi.Revshop.entity.User;
import com.weiyi.Revshop.repository.UserRepository;
import com.weiyi.Revshop.service.SellerProfileService;
import com.weiyi.Revshop.DTO.sellerProfileDTO;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/sellers")
public class SellerProfileController {
    
    @Autowired
    private SellerProfileService sellerProfileService;

    @Autowired
    private UserRepository userRepository;


    @GetMapping("/profile/{userId}")
    public ResponseEntity<?> getSellerProfile(@PathVariable Long userId) {
        SellerProfile profile = sellerProfileService.getSellerProfileByUserId(userId);
        if (profile != null && profile.getBusinessName() != null && profile.getBusinessAddress() != null) {
            sellerProfileDTO profileDTO = new sellerProfileDTO(
            profile.getId(),
            profile.getBusinessName(),
            profile.getBusinessAddress()
        );
        return ResponseEntity.ok(profileDTO);
        }
        return ResponseEntity.status(404).body("Seller profile incomplete. Please add business details.");
    }

    @PostMapping("/updateProfile")
    public ResponseEntity<?> updateSellerProfile(@RequestBody SellerProfile sellerProfile, Principal principal) {
        User authenticatedUser = userRepository.findByEmail(principal.getName())
            .orElseThrow(() -> new RuntimeException("User not found"));

        sellerProfile.setUser(authenticatedUser);
        SellerProfile updatedProfile = sellerProfileService.saveSellerProfile(sellerProfile);
        return ResponseEntity.ok(updatedProfile);
    }
}
