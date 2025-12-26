package com.domluveno.security

import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import io.jsonwebtoken.security.Keys
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component
import java.nio.charset.StandardCharsets
import java.util.Date

@Component
class JwtTokenProvider(
    @Value("\${security.jwt.secret}") private val secret: String,
    @Value("\${security.jwt.access-token-ttl-minutes:30}") private val accessTtlMinutes: Long,
) {
    private val key = Keys.hmacShaKeyFor(secret.toByteArray(StandardCharsets.UTF_8))

    fun createToken(userId: String, email: String, role: String): String {
        val now = Date()
        val expiry = Date(now.time + accessTtlMinutes * 60 * 1000)

        return Jwts.builder()
            .setSubject(userId)
            .claim("email", email)
            .claim("role", role)
            .setIssuedAt(now)
            .setExpiration(expiry)
            .signWith(key, SignatureAlgorithm.HS256)
            .compact()
    }

    fun parseToken(token: String): JwtUserInfo? {
        return try {
            val claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .body
            JwtUserInfo(
                userId = claims.subject,
                email = claims["email"] as? String ?: "",
                role = claims["role"] as? String ?: "user"
            )
        } catch (ex: Exception) {
            null
        }
    }
}

data class JwtUserInfo(
    val userId: String,
    val email: String,
    val role: String,
)

