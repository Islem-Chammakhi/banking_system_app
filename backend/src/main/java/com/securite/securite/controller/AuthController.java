package com.securite.securite.controller;

import com.securite.securite.dto.LoginDTO;
import com.securite.securite.dto.RegisterDTO;
import com.securite.securite.models.User;
import com.securite.securite.service.RegistrationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AuthenticationManager authenticationManager;

    private final RegistrationService registrationService;

    public AuthController(AuthenticationManager authenticationManager, RegistrationService registrationService) {
        this.authenticationManager = authenticationManager;
        this.registrationService = registrationService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterDTO dto) {
        try {
            User created = registrationService.registerNewUser(dto);
            // Don't return the created entity with password; return minimal info or 201
            return ResponseEntity.status(201).body(
                    Map.of(
                        "message", "User registered",
                        "cin", created.getCin(),
                        "createdAt", created.getCreatedAt()
                    )
            );
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(Map.of("error", ex.getMessage()));
        } catch (Exception ex) {
            // generic fallback
            return ResponseEntity.status(500).body(Map.of("error", "Internal error"));
        }
    }

@PostMapping("/login")
public ResponseEntity<?> login(@RequestBody LoginDTO dto, HttpServletRequest request) {

    UsernamePasswordAuthenticationToken authToken =
            new UsernamePasswordAuthenticationToken(dto.getCin(), dto.getPassword());

    Authentication authentication = authenticationManager.authenticate(authToken);

    // Create session
    request.getSession(true);

    return ResponseEntity.ok(Map.of(
            "message", "Logged in successfully",
            "cin", dto.getCin()
    ));
}

}
