package com.domluveno.repository

import com.domluveno.domain.ConversationEntity
import org.springframework.data.jpa.repository.JpaRepository
import java.util.UUID

interface ConversationRepository : JpaRepository<ConversationEntity, UUID> {
    fun findByRequestId(requestId: UUID): ConversationEntity?
}

