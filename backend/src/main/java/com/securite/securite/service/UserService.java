package com.securite.securite.service;

import org.springframework.stereotype.Service;

import com.securite.securite.models.User;
import com.securite.securite.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    public final UserRepository userRepo;

    public User getUserByCin(String cin){
        return userRepo.findByCin(cin).orElseThrow(() -> new RuntimeException("User doesn't exist !"));
    }    
}
