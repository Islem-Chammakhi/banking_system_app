package com.securite.securite.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class TransferResponse {
    private String senderCardNumber;
    private String receiverCardNumber;
    private double amount;
}
