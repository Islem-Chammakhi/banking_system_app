package com.securite.securite.chain_responsibility.auth.register;

import org.springframework.stereotype.Component;

import com.securite.securite.chain_responsibility.auth.BaseHandler;
import com.securite.securite.dto.RegisterDTO;

@Component
public class ConfirmPasswordHandler extends BaseHandler<RegisterDTO> {

        @Override
    public void handle(RegisterDTO request){
        boolean match = request.getPassword().equals(request.getConfirmPassword());
        if (!match){
            throw new RuntimeException ("password does not match confirm password !");
        }
        super.handle(request);
    }
}
