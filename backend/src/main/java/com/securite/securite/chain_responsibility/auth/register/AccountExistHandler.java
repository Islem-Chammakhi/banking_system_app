package com.securite.securite.chain_responsibility.auth.register;

import org.springframework.stereotype.Component;

import com.securite.securite.chain_responsibility.auth.BaseHandler;
import com.securite.securite.dto.RegisterDTO;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class AccountExistHandler  extends BaseHandler<RegisterDTO>{

    @Override
    public void handle(RegisterDTO request){
        boolean exists = super.getUser().getAccount().getCardNumber().equals(request.getCardNumber());
        if (!exists){
            throw new RuntimeException ("this user doesn't have account yet !");
        }
        super.handle(request);
    }
}
