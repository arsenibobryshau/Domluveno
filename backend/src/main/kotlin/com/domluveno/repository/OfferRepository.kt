package com.domluveno.repository

import com.domluveno.domain.OfferEntity
import org.springframework.data.jpa.repository.JpaRepository
import java.util.UUID

interface OfferRepository : JpaRepository<OfferEntity, UUID> {
    fun findAllByRequestId(requestId: UUID): List<OfferEntity>
}

