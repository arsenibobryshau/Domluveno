package com.domluveno.service

import com.domluveno.api.dto.AuthResponse
import com.domluveno.api.dto.LoginRequest
import com.domluveno.api.dto.RegisterRequest
import com.domluveno.domain.ProfileEntity
import com.domluveno.domain.UserEntity
import com.domluveno.repository.ProfileRepository
import com.domluveno.repository.UserRepository
import com.domluveno.security.JwtTokenProvider
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class AuthService(
    private val userRepository: UserRepository,
    private val profileRepository: ProfileRepository,
    private val passwordEncoder: PasswordEncoder,
    private val tokenProvider: JwtTokenProvider,
) {

    @Transactional
    fun register(req: RegisterRequest): AuthResponse {
        if (userRepository.existsByEmail(req.email)) {
            throw IllegalArgumentException("Email už existuje")
        }
        val user = userRepository.save(
            UserEntity(
                email = req.email.lowercase(),
                passwordHash = passwordEncoder.encode(req.password),
                role = "user",
            )
        )
        profileRepository.save(
            ProfileEntity(
                userId = user.id,
                firstName = req.firstName,
                lastName = req.lastName,
            )
        )
        val token = tokenProvider.createToken(user.id.toString(), user.email, user.role)
        return AuthResponse(token)
    }

    fun login(req: LoginRequest): AuthResponse {
        val user = userRepository.findByEmail(req.email.lowercase())
            ?: throw IllegalArgumentException("Nesprávný email nebo heslo")
        if (!passwordEncoder.matches(req.password, user.passwordHash)) {
            throw IllegalArgumentException("Nesprávný email nebo heslo")
        }
        val token = tokenProvider.createToken(user.id.toString(), user.email, user.role)
        return AuthResponse(token)
    }
}

