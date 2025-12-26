package com.domluveno.api.dto

import jakarta.validation.constraints.Email
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.Size

data class RegisterRequest(
    @field:Email @field:NotBlank
    val email: String,
    @field:NotBlank @field:Size(min = 6, max = 100)
    val password: String,
    @field:NotBlank
    val firstName: String,
    @field:NotBlank
    val lastName: String,
)

data class LoginRequest(
    @field:Email @field:NotBlank
    val email: String,
    @field:NotBlank
    val password: String,
)

data class AuthResponse(
    val token: String
)

