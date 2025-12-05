package com.securite.securite.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.securite.securite.models.Account;

public interface AccountRepository extends JpaRepository<Account,Long> {
    public Account findByCardNumber(String cardNumber);
}
