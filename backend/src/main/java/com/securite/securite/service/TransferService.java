package com.securite.securite.service;

import org.springframework.stereotype.Service;

import com.securite.securite.chain_responsibility.transfer.CheckBalance;
import com.securite.securite.chain_responsibility.transfer.CheckStatusAccountReceiver;
import com.securite.securite.chain_responsibility.transfer.CheckStatusAccountSender;
import com.securite.securite.chain_responsibility.transfer.ExistAccountReceiver;
import com.securite.securite.chain_responsibility.transfer.ExistAccountSender;
import com.securite.securite.chain_responsibility.transfer.TransferHandler;
import com.securite.securite.dto.TransferDTO;
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

    private final ExistAccountSender existAccountSender;
    private final ExistAccountReceiver existAccountReceiver;
    private final CheckStatusAccountSender checkStatusAccountSender;
    private final CheckStatusAccountReceiver checkStatusAccountReceiver;
    private final CheckBalance checkBalance;
    private final TransferHandler transferHandler;



    @Transactional
    public Transaction transfer(TransferDTO transferDTO){
        existAccountSender.setNext(existAccountReceiver)
                          .setNext(checkStatusAccountSender)
                          .setNext(checkStatusAccountReceiver)
                          .setNext(checkBalance)
                          .setNext(transferHandler);

        existAccountSender.handle(transferDTO);

        Account sender = existAccountSender.getSenderAccount();
        Account receiver = existAccountReceiver.getReceiverAccount();

        Transaction transaction = Transaction.builder()
                                             .amount(transferDTO.getAmount())
                                             .receiverAccount(receiver)
                                             .senderAccount(sender)
                                             .status(TransactionStatus.COMPLETED)
                                             .description("transfer amount from "+ sender.getCardNumber()+" to "+receiver.getCardNumber())
                                             .build();
                                             
        return transactionService.addTransaction(transaction);
    }
}
