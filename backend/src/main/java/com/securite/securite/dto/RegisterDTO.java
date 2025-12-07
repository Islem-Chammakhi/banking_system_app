package com.securite.securite.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.Email;
import lombok.Data;

@Data
public class RegisterDTO {

    @NotBlank(message = "CIN is required")
    @Size(min = 4, max = 30, message = "CIN length invalid")
    private String cin;

    @NotBlank(message = "card number is required")
    @Size(min = 16, max = 16, message = "card number length invalid")
    private String cardNumber;

    @NotBlank(message = "Password is required")
    @Size(min = 8, message = "Password must be at least 8 characters")
    private String password;

    @NotBlank(message = "Password is required")
    @Size(min = 8, message = "Password must be at least 8 characters")
    private String confirmPassword;

    @Email(message = "Invalid email")
    private String email;
}