package com.securite.securite.controller;

import org.springframework.web.bind.annotation.RestController;

import com.securite.securite.models.Account;
import com.securite.securite.models.AccountStatus;
import com.securite.securite.models.User;
import com.securite.securite.repository.AccountRepository;
import com.securite.securite.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.boot.webmvc.autoconfigure.WebMvcProperties.Apiversion.Use;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequiredArgsConstructor
public class AccountController {
    private final UserRepository userRepo;
    private final AccountRepository accountRepo;

    @PostMapping("/account")
    public String addAccount() {
        User u1 = userRepo.findByCin("12345678").orElse(null);
        Account c1 =Account.builder()
                                .cardNumber("0123456789123456")
                                .balance(300.0)
                                .status(AccountStatus.ACTIVE)
                                .user(u1)
                                .build();



        accountRepo.save(c1);
        
        return "accounts created sucessfully";
    }
    
}
