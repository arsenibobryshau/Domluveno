package com.domluveno.security

import org.springframework.security.core.context.SecurityContextHolder
import java.util.UUID

fun currentUserId(): UUID? {
    val auth = SecurityContextHolder.getContext().authentication ?: return null
    val principal = auth.principal as? String ?: auth.principal?.toString() ?: return null
    return try {
        UUID.fromString(principal)
    } catch (_: Exception) {
        null
    }
}

