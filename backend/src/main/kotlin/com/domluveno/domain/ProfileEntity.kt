package com.domluveno.domain

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.Table
import java.time.Instant
import java.util.UUID

@Entity
@Table(name = "profiles")
data class ProfileEntity(
    @Id
    @Column(name = "user_id")
    val userId: UUID,

    @Column(name = "first_name", nullable = false)
    val firstName: String,

    @Column(name = "last_name", nullable = false)
    val lastName: String,

    @Column
    val phone: String? = null,

    @Column(nullable = false)
    val verified: Boolean = false,

    @Column
    val bio: String? = null,

    @Column
    val skills: String? = null,

    @Column
    val city: String? = null,

    @Column(name = "created_at", nullable = false)
    val createdAt: Instant = Instant.now(),

    @Column(name = "updated_at", nullable = false)
    val updatedAt: Instant = Instant.now(),
)

