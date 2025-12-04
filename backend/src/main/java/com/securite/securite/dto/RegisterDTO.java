package com.securite.securite.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Email;
import lombok.Data;

@Data
public class RegisterDTO {

    @NotBlank(message = "CIN is required")
    @Size(min = 4, max = 30, message = "CIN length invalid")
    private String cin;

    @NotBlank(message = "Password is required")
    @Size(min = 8, message = "Password must be at least 8 characters")
    private String password;

    @NotBlank(message = "First name is required")
    private String firstName;

    @NotBlank(message = "Last name is required")
    private String lastName;

    // optional
    @Pattern(regexp = "^(\\+?\\d{7,15})?$", message = "Invalid phone")
    private String phone;

    @Email(message = "Invalid email")
    private String email;
}