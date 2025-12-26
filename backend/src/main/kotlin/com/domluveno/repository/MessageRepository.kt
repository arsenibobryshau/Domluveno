package com.domluveno.repository

import com.domluveno.domain.MessageEntity
import org.springframework.data.jpa.repository.JpaRepository
import java.time.Instant
import java.util.UUID

interface MessageRepository : JpaRepository<MessageEntity, UUID> {
    fun findByConversationIdOrderByCreatedAtAsc(conversationId: UUID): List<MessageEntity>
    fun findByConversationIdAndCreatedAtAfterOrderByCreatedAtAsc(conversationId: UUID, after: Instant): List<MessageEntity>
}

