package com.securite.securite.chain_responsibility.transfer;

import org.springframework.stereotype.Component;

import com.securite.securite.dto.TransferDTO;
import com.securite.securite.service.AccountService;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class CheckBalance extends BaseHandler<TransferDTO> {

    private final AccountService accountService;


    @Override
    public void handle(TransferDTO request){
        boolean validAmount=accountService.checkAmount(super.getSenderAccount(),request.getAmount());
        if(!validAmount){
            throw new RuntimeException("Insufficient balance !");            
        }
        
        super.handle(request);
    }

}
