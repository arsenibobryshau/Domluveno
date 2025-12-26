package com.domluveno.domain

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.Table
import java.time.Instant
import java.util.UUID

@Entity
@Table(name = "conversations")
data class ConversationEntity(
    @Id
    val id: UUID = UUID.randomUUID(),

    @Column(name = "request_id")
    val requestId: UUID? = null,

    @Column(name = "user_a", nullable = false)
    val userA: UUID,

    @Column(name = "user_b", nullable = false)
    val userB: UUID,

    @Column(name = "created_at", nullable = false)
    val createdAt: Instant = Instant.now(),
)

