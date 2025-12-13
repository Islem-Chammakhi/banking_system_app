package com.securite.securite.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.securite.securite.models.Role;
import com.securite.securite.models.User;
import com.securite.securite.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@RestController("/auth")
@RequiredArgsConstructor

public class UserController {
    private final UserRepository userRepository;
    
    @PostMapping("/insert-user")
    public void insertMockUser() {

        User user = User.builder()
                .cin("12345678")
                // .password("password123")
                // .confirm_password("password123")
                .first_name("Islem")
                .last_name("Chammakhi")
                .phone("50123456")
                .email("islem@test.com")
                .signed_up(true)
                .role(Role.USER)  // adapte à ton enum
                .build();

                // User user1 = User.builder()
                // .cin("87654321")
                // // .password("password123")
                // // .confirm_password("password123")
                // .first_name("Firas")
                // .last_name("Ben Ali")
                // .phone("22456789")
                // .email("firas@test.com")
                // .signed_up(true)
                // .role(Role.USER)  // adapte à ton enum
                // .build();

         userRepository.save(user);
        //  userRepository.save(user1);
    }
}
