package com.securite.securite.chain_responsibility.transfer;

import org.springframework.stereotype.Component;

import com.securite.securite.dto.TransferDTO;
import com.securite.securite.models.Account;
import com.securite.securite.service.AccountService;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class ExistAccountSender extends BaseHandler<TransferDTO> {

    private final AccountService accountService;

    @Override
    public void handle(TransferDTO request){
        Account sender = accountService.checkExistingAccount(request.getSenderCardNumber());
        if(sender==null){
            throw new RuntimeException("your are account is in trouble please contact the bank");
        }
        super.setSenderAccount(sender);

        super.handle(request);
    }

}
