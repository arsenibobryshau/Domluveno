package com.domluveno.domain

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.Table
import java.time.Instant
import java.util.UUID

@Entity
@Table(name = "messages")
data class MessageEntity(
    @Id
    val id: UUID = UUID.randomUUID(),

    @Column(name = "conversation_id", nullable = false)
    val conversationId: UUID,

    @Column(name = "sender_id", nullable = false)
    val senderId: UUID,

    @Column(nullable = false)
    val body: String,

    @Column(name = "created_at", nullable = false)
    val createdAt: Instant = Instant.now(),

    @Column(name = "read_at")
    val readAt: Instant? = null,
)

