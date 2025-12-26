package com.domluveno.domain

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.FetchType
import jakarta.persistence.Id
import jakarta.persistence.JoinColumn
import jakarta.persistence.ManyToOne
import jakarta.persistence.Table
import java.math.BigDecimal
import java.time.Instant
import java.util.UUID

@Entity
@Table(name = "offers")
data class OfferEntity(
    @Id
    val id: UUID = UUID.randomUUID(),

    @Column(name = "request_id", nullable = false)
    val requestId: UUID,

    @Column(name = "provider_id", nullable = false)
    val providerId: UUID,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "request_id", insertable = false, updatable = false)
    val request: RequestEntity? = null,

    @Column
    val message: String? = null,

    @Column
    val price: BigDecimal? = null,

    @Column(nullable = false)
    val currency: String = "CZK",

    @Column(nullable = false)
    val status: String = "pending",

    @Column(name = "created_at", nullable = false)
    val createdAt: Instant = Instant.now(),
)

