package com.securite.securite.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.securite.securite.models.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction,Long> {

}
