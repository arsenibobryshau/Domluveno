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
@Table(name = "requests")
data class RequestEntity(
    @Id
    val id: UUID = UUID.randomUUID(),

    @Column(name = "requester_id", nullable = false)
    val requesterId: UUID,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", insertable = false, updatable = false)
    val category: CategoryEntity? = null,

    @Column(name = "category_id", nullable = false)
    val categoryId: Int,

    @Column(nullable = false)
    val title: String,

    @Column
    val description: String? = null,

    @Column
    val location: String? = null,

    @Column
    val budget: BigDecimal? = null,

    @Column(nullable = false)
    val currency: String = "CZK",

    @Column(nullable = false)
    val status: String = "open",

    @Column(name = "created_at", nullable = false)
    val createdAt: Instant = Instant.now(),

    @Column(name = "updated_at", nullable = false)
    val updatedAt: Instant = Instant.now(),
)

