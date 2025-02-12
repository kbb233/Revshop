package com.weiyi.Revshop.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.weiyi.Revshop.entity.BuyerProfile;

public interface BuyerProfileRepository extends JpaRepository<BuyerProfile, Long> {
    Optional<BuyerProfile> findByUserId(Long userId);
    Optional<BuyerProfile> findBuyerProfileById(Long id);
    
    
}
