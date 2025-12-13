package com.securite.securite.chain_responsibility.auth.login;

import org.springframework.stereotype.Component;

import com.securite.securite.chain_responsibility.auth.BaseHandler;
import com.securite.securite.dto.LoginDTO;
import com.securite.securite.models.User;
import com.securite.securite.service.UserService;


import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class UserExistLoginHandler extends BaseHandler<LoginDTO> {
    private final UserService userService;
    
    @Override
    public void handle(LoginDTO request){
        User current_user = userService.getUserByCin(request.getCin());
        
        super.setUser(current_user);
        System.out.println("credentials already exists !");
        
        super.handle(request);
    }

    
}
