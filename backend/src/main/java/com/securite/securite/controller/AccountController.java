package com.securite.securite.controller;

import org.springframework.web.bind.annotation.RestController;

import com.securite.securite.models.Account;
import com.securite.securite.models.AccountStatus;
import com.securite.securite.models.User;
import com.securite.securite.repository.AccountRepository;
import com.securite.securite.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.PostMapping;


@RestController
@RequiredArgsConstructor
public class AccountController {
    private final UserRepository userRepo;
    private final AccountRepository accountRepo;

    @PostMapping("/account")
    public String addAccount() {
        User u1 = userRepo.findByCin("87654321").orElse(null);
        Account c1 =Account.builder()
                                .cardNumber("6543219876543210")
                                .balance(300.0)
                                .status(AccountStatus.ACTIVE)
                                .user(u1)
                                .build();



        accountRepo.save(c1);
        
        return "accounts created sucessfully";
    }
    
}
