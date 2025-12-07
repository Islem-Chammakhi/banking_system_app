package com.securite.securite.service;

import com.securite.securite.chain_responsibility.auth.AccountExistHandler;
import com.securite.securite.chain_responsibility.auth.ConfirmPasswordHandler;
import com.securite.securite.chain_responsibility.auth.SignedUpHandler;
import com.securite.securite.chain_responsibility.auth.UserExistHandler;
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


@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final UserExistHandler  userHandler ;
    private final ConfirmPasswordHandler  confirmPasswHandler ;
    private final AccountExistHandler  accountHandler ;
    private final SignedUpHandler  signedUpHandler ;

    @Transactional
    public User registerNewUser(RegisterDTO dto) {
        userHandler.setNext(confirmPasswHandler)
                   .setNext(accountHandler)
                   .setNext(signedUpHandler);
        userHandler.handle(dto);
        

        User user = userHandler.getUser();
        user.setSigned_up(true);


        return userRepository.save(user);
    }

public Authentication login(LoginDTO dto){
    UsernamePasswordAuthenticationToken token =
       new UsernamePasswordAuthenticationToken(dto.getCin(), dto.getPassword());

    return authenticationManager.authenticate(token);
}

}
