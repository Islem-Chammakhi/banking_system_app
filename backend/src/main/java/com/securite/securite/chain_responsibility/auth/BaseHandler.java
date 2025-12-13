package com.securite.securite.chain_responsibility.auth;


import com.securite.securite.models.User;

import lombok.Data;

@Data
public abstract class BaseHandler<T> implements Handler<T> {
    private Handler<T> next;
    protected static User user;

    public void setUser(User user){
        this.user=user;
    }

    public User getUser(){
        return this.user;
    }

    @Override
    public Handler<T> setNext(Handler<T> next){
        this.next=next;
        return next;
    }

    @Override
    public void handle(T request){
        if(next==null){
            System.out.println("process done !");
            return;
        }
        next.handle(request);
    }
}
