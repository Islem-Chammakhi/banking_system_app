package com.securite.securite.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long accountId;
    
    @Column(unique = true, nullable = false)
    private String cardNumber;
    
    @Column(nullable = false)
    private Double balance;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AccountStatus status ;
    
    @Column(nullable = false)
    private LocalDateTime createdAt;
    
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore 
    private User user;

    @PrePersist
    public void prePersist() {
        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }
    }
}