package com.securite.securite.controller;

import com.securite.securite.dto.LoginDTO;
import com.securite.securite.dto.RegisterDTO;
import com.securite.securite.models.User;
import com.securite.securite.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;



    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterDTO dto) {
        try {
            User created = authService.registerNewUser(dto);
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
public ResponseEntity<?> login(@RequestBody LoginDTO dto, HttpServletRequest request, HttpServletResponse response) {

    Authentication auth = authService.login(dto);

    SecurityContext context = SecurityContextHolder.createEmptyContext();
    context.setAuthentication(auth);

    // créeer le contexte manuellement 
    HttpSessionSecurityContextRepository repo = new HttpSessionSecurityContextRepository();
    repo.saveContext(context, request, response); // créer la session si n'existe pas automatiquement

    // SecurityContextHolder.getContext().setAuthentication(authentication);
    // ! met l’utilisateur dans le contexte courant du thread,Pas dans la session !

    return ResponseEntity.ok(Map.of("message", "Logged in"));
}


    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        request.getSession().invalidate();
        SecurityContextHolder.clearContext();
        return ResponseEntity.ok("Logged out !");
}
}
