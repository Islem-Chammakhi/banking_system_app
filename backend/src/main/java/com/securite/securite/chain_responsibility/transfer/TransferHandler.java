package com.securite.securite.chain_responsibility.transfer;

import org.springframework.stereotype.Component;

import com.securite.securite.dto.TransferDTO;
import com.securite.securite.service.AccountService;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class TransferHandler extends BaseHandler<TransferDTO> {
        private final AccountService accountService;

    @Override
    public void handle(TransferDTO request){
        accountService.updateAmount(super.getSenderAccount(),super.getSenderAccount().getBalance()-request.getAmount());
        accountService.updateAmount(super.getReceiverAccount(),super.getReceiverAccount().getBalance()+request.getAmount());
        
        super.handle(request);
    }

}
