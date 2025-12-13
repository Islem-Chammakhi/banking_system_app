package com.securite.securite.chain_responsibility.auth.register;

import org.springframework.stereotype.Component;

import com.securite.securite.chain_responsibility.auth.BaseHandler;
import com.securite.securite.dto.RegisterDTO;
import com.securite.securite.models.User;
import com.securite.securite.service.UserService;


import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class UserExistHandler extends BaseHandler<RegisterDTO> {
    private final UserService userService;
    
    @Override
    public void handle(RegisterDTO request){
        User current_user = userService.getUserByCin(request.getCin());
        boolean validInput=current_user.getEmail().equals(request.getEmail());
        if(!validInput){
            throw new RuntimeException("user data are incorrect !");
        }
        super.setUser(current_user);
        System.out.println("credentials already exists !");
        
        super.handle(request);
    }

    
}
