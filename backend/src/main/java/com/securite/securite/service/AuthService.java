package com.securite.securite.service;

import com.securite.securite.chain_responsibility.auth.login.SignedInHandler;
import com.securite.securite.chain_responsibility.auth.login.UserExistLoginHandler;
import com.securite.securite.chain_responsibility.auth.register.AccountExistHandler;
import com.securite.securite.chain_responsibility.auth.register.ConfirmPasswordHandler;
import com.securite.securite.chain_responsibility.auth.register.SignedUpHandler;
import com.securite.securite.chain_responsibility.auth.register.UserExistHandler;
import com.securite.securite.chain_responsibility.auth.login.AccountExistHandlerLogin;
import com.securite.securite.chain_responsibility.auth.login.PasswordMatchHandler;
import com.securite.securite.dto.LoginDTO;
import com.securite.securite.dto.RegisterDTO;
import com.securite.securite.models.User;
import com.securite.securite.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;


@Service
@RequiredArgsConstructor
public class AuthService {

    private final PasswordEncoder passwordEncoder;

    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final UserExistHandler  userHandler ;
    private final ConfirmPasswordHandler  confirmPasswHandler ;
    private final AccountExistHandler  accountHandler ;
    private final SignedUpHandler  signedUpHandler ;

    private final UserExistLoginHandler userExistLoginHandler;
    private final PasswordMatchHandler passwordMatchHandler;
    private final AccountExistHandlerLogin accountExistHandlerLogin;
    private final SignedInHandler signedInHandler;




    @Transactional
    public User registerNewUser(RegisterDTO dto) {
        userHandler.setNext(confirmPasswHandler)
                   .setNext(accountHandler)
                   .setNext(signedUpHandler);
        userHandler.handle(dto);
        

        User user = userHandler.getUser();
        user.setSigned_up(true);
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setConfirm_password(passwordEncoder.encode(dto.getConfirmPassword()));


        return userRepository.save(user);
    }

    @Transactional
    public Authentication login(LoginDTO dto){
        userExistLoginHandler.setNext(passwordMatchHandler)
                   .setNext(accountExistHandlerLogin)
                   .setNext(signedInHandler);
        userExistLoginHandler.handle(dto);
                   

        UsernamePasswordAuthenticationToken token =
       new UsernamePasswordAuthenticationToken(dto.getCin(), dto.getPassword());

    return authenticationManager.authenticate(token);
}

}
