package com.securite.securite.service;

import org.springframework.stereotype.Service;

import com.securite.securite.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    public final UserRepository userRepo;

    
}
