package com.securite.securite.service;

import org.springframework.stereotype.Service;

import com.securite.securite.models.Account;
import com.securite.securite.models.AccountStatus;
import com.securite.securite.models.User;
import com.securite.securite.repository.AccountRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AccountService {
    private  final  AccountRepository accountRepo;

    public void updateAmount(Account account,double amount){
        account.setBalance(amount);
        accountRepo.save(account);
    } 


    public   boolean checkAmount( Account sender ,double amount){
        return sender.getBalance()-amount >=0;
    }

    public   boolean checkAccountStatus( Account account){
        return account.getStatus().name()==AccountStatus.ACTIVE.name();
    }

    public  Account checkExistingAccount(String cardNumber){
        return accountRepo.findByCardNumber(cardNumber);
    }

    public boolean getAccountByUser(User user ){
        return  accountRepo.existsByUser(user);
    }
}
