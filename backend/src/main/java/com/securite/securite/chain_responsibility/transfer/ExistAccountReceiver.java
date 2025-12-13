package com.securite.securite.chain_responsibility.transfer;

import org.springframework.stereotype.Component;

import com.securite.securite.dto.TransferDTO;
import com.securite.securite.models.Account;
import com.securite.securite.service.AccountService;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class ExistAccountReceiver extends BaseHandler<TransferDTO> {

    private final AccountService accountService;

    @Override
    public void handle(TransferDTO request){
        Account receiver = accountService.checkExistingAccount(request.getReceiverCardNumber());
        if(receiver==null){
            throw new RuntimeException("unknown destination !");
        }
        super.setReceiverAccount(receiver);
        super.handle(request);
    }

}
