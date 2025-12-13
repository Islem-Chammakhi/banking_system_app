package com.securite.securite.chain_responsibility.transfer;

import org.springframework.stereotype.Component;

import com.securite.securite.dto.TransferDTO;
import com.securite.securite.models.AccountStatus;

@Component
public class CheckStatusAccountReceiver extends BaseHandler<TransferDTO> {

    @Override
    public void handle(TransferDTO request){
        boolean isActive = super.getReceiverAccount().getStatus().name().equals(AccountStatus.ACTIVE.name());

        if(!isActive){
            throw new RuntimeException("the account with card number :"+request.getReceiverCardNumber()+" is suspended");
        }
        super.handle(request);
    }

}
