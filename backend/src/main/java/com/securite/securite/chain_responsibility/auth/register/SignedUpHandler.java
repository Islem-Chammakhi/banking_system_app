package com.securite.securite.chain_responsibility.auth.register;

import org.springframework.stereotype.Component;

import com.securite.securite.chain_responsibility.auth.BaseHandler;
import com.securite.securite.dto.RegisterDTO;

@Component
public class SignedUpHandler extends BaseHandler<RegisterDTO> {

    @Override
    public void handle(RegisterDTO request){
        boolean signed_up = super.getUser().isSigned_up();
        if (signed_up){
            throw new RuntimeException ("this user has already an account !");
        }
        super.handle(request);
    }
}
