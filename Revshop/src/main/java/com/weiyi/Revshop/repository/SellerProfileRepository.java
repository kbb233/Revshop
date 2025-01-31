package com.weiyi.Revshop.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.weiyi.Revshop.entity.SellerProfile;

public interface  SellerProfileRepository extends JpaRepository<SellerProfile, Long>{
    Optional<SellerProfile> findByUserId(Long userId);
}
