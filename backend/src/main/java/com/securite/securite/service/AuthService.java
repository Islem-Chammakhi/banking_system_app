package com.securite.securite.service;

import com.securite.securite.dto.LoginDTO;
import com.securite.securite.dto.RegisterDTO;
import com.securite.securite.models.User;
import com.securite.securite.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;

import java.time.LocalDateTime;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;


    @Transactional
    public User registerNewUser(RegisterDTO dto) {
        // 1. Check duplicate
        if (userRepository.existsByCin(dto.getCin())) {
            throw new IllegalArgumentException("CIN already in use");
        }

        // 2. Map DTO -> Entity
        User user = new User();
        user.setCin(dto.getCin());
        // hash the password before storing
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setPhone(dto.getPhone());
        user.setEmail(dto.getEmail());
        user.setCreatedAt(LocalDateTime.now());
        // role defaults to USER (from entity), account left null for now

        // 3. Save
        return userRepository.save(user);
    }

public Authentication login(LoginDTO dto){
    UsernamePasswordAuthenticationToken token =
       new UsernamePasswordAuthenticationToken(dto.getCin(), dto.getPassword());

    return authenticationManager.authenticate(token);
}

}
