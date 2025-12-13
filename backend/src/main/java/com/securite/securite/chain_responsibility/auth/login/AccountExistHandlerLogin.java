package com.securite.securite.chain_responsibility.auth.login;

import org.springframework.stereotype.Component;

import com.securite.securite.chain_responsibility.auth.BaseHandler;
import com.securite.securite.dto.LoginDTO;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class AccountExistHandlerLogin  extends BaseHandler<LoginDTO>{

    @Override
    public void handle(LoginDTO request){
        boolean hasAccount = super.getUser().getAccount()!=null;
        if (!hasAccount){
            throw new RuntimeException ("this user doesn't have account yet !");
        }
        super.handle(request);
    }
}
