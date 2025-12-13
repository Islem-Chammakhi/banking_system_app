package com.securite.securite.chain_responsibility.transfer;

public interface Handler<T>{
    Handler<T> setNext(Handler<T> next);
    void handle(T request);
}
