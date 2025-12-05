package com.securite.securite.service;

import org.springframework.stereotype.Service;

import com.securite.securite.models.Account;
import com.securite.securite.models.Transaction;
import com.securite.securite.models.TransactionStatus;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class TransferService {

    private final TransactionService transactionService;
    private final AccountService accountService;



    @Transactional
    public Transaction transfer(String cardNumberSender,String cardNumberReceiver,double amount){
        Account sender=accountService.checkExistingAccount(cardNumberSender);
        Account receiver=accountService.checkExistingAccount(cardNumberReceiver);
        if(receiver == null){
            throw new RuntimeException("Le compte de destinataire n'existe pas  !");
        }
        boolean senderAccountsStatus=accountService.checkAccountStatus(sender);
        boolean receiverAccountsStatus=accountService.checkAccountStatus(receiver);
        if(!senderAccountsStatus){
            throw new RuntimeException("Votre compte est désactivé !");
        }
        
        if(!receiverAccountsStatus){
            throw new RuntimeException("Le compte de destinataire est désactivé !");
        }
        
        boolean validAmount=accountService.checkAmount(sender,amount);
        if(!validAmount){
            throw new RuntimeException("Solde insuffisant !");            
        }


        accountService.updateAmount(sender,sender.getBalance()-amount);
        accountService.updateAmount(receiver,receiver.getBalance()+amount);

        Transaction transaction = Transaction.builder()
                                             .amount(amount)
                                             .receiverAccount(receiver)
                                             .senderAccount(sender)
                                             .status(TransactionStatus.COMPLETED)
                                             .description("transfer amount from "+ sender.getCardNumber()+" to "+receiver.getCardNumber())
                                             .build();
        return transactionService.addTransaction(transaction);
    }
}
