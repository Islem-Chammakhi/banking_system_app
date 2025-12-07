package com.securite.securite.chain_responsibility.auth;

import org.springframework.stereotype.Component;

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
        User curent_user = userService.getUserByCin(request.getCin());

        super.setUser(curent_user);
        System.out.println("User Exists !");
        
        super.handle(request);
    }
}
