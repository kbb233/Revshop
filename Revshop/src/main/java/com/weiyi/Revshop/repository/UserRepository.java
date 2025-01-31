package com.weiyi.Revshop.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.weiyi.Revshop.entity.User;

public interface UserRepository extends JpaRepository<User,Long>{
    Optional<User> findByEmail(String email);
    Optional<User> findByUsername(String username);
    boolean existsByEmail(String email); 
}
