package com.securite.securite.chain_responsibility.transfer;


import com.securite.securite.models.Account;

import lombok.Data;

@Data
public abstract class BaseHandler<T> implements Handler<T> {
    private Handler<T> next;
    protected static Account senderAccount;
    protected static Account receiverAccount;

    public static Account getReceiverAccount() {
        return receiverAccount;
    }
    public static Account getSenderAccount() {
        return senderAccount;
    }
    public static void setSenderAccount(Account senderAccount) {
        BaseHandler.senderAccount = senderAccount;
    }
    public static void setReceiverAccount(Account receiverAccount) {
        BaseHandler.receiverAccount = receiverAccount;
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
