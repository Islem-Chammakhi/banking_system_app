package com.securite.securite.controller;

import org.springframework.web.bind.annotation.RestController;

import com.securite.securite.dto.TransferDTO;
import com.securite.securite.dto.TransferResponse;
import com.securite.securite.models.Transaction;
import com.securite.securite.service.TransferService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RequiredArgsConstructor
@RestController
@RequestMapping("/transfer")
public class TransferController {

    private final TransferService transferService;

    @PostMapping("/send")
    public ResponseEntity<TransferResponse> send(@RequestBody TransferDTO transfer) {
        Transaction transaction = transferService.transfer(transfer);
        TransferResponse response = TransferResponse.builder()
                                                    .amount(transaction.getAmount())
                                                    .senderCardNumber(transaction.getSenderAccount().getCardNumber())
                                                    .receiverCardNumber(transaction.getReceiverAccount().getCardNumber())
                                                    .build();
        return ResponseEntity.ok(response);
    }

    

}
