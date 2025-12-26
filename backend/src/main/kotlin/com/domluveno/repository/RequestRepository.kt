package com.domluveno.repository

import com.domluveno.domain.RequestEntity
import org.springframework.data.jpa.repository.JpaRepository
import java.util.UUID

interface RequestRepository : JpaRepository<RequestEntity, UUID> {
    fun findAllByRequesterIdOrderByCreatedAtDesc(requesterId: UUID): List<RequestEntity>
}

