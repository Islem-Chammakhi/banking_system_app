package com.securite.securite.chain_responsibility.auth.login;

import org.springframework.stereotype.Component;

import com.securite.securite.chain_responsibility.auth.BaseHandler;
import com.securite.securite.dto.LoginDTO;

@Component
public class SignedInHandler extends BaseHandler<LoginDTO> {

    @Override
    public void handle(LoginDTO request){
        boolean signed_up = super.getUser().isSigned_up();
        if (!signed_up){
            throw new RuntimeException ("you don't have an account in our application yet create an account !");
        }
        super.handle(request);
    }
}
