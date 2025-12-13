package com.securite.securite.chain_responsibility.auth.login;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.securite.securite.chain_responsibility.auth.BaseHandler;
import com.securite.securite.dto.LoginDTO;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class PasswordMatchHandler extends BaseHandler<LoginDTO> {

    private final PasswordEncoder passwordEncoder;
    
    @Override
    public void handle(LoginDTO request){
        final String rawPassword = request.getPassword();          
        final String hashedPassword = super.getUser().getPassword();

        boolean match = passwordEncoder.matches(rawPassword, hashedPassword);

        System.out.println(match);
        if (!match){
            throw new RuntimeException ("cin or password are incorrect!");
        }
        super.handle(request);
    }
}
