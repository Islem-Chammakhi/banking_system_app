package com.securite.securite.service;

import org.springframework.stereotype.Service;

import com.securite.securite.models.Transaction;
import com.securite.securite.repository.TransactionRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class TransactionService {
    private final TransactionRepository transactionRepo;

    
    public Transaction addTransaction(Transaction transaction){
        return  transactionRepo.save(transaction);
    }
}
