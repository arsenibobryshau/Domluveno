package com.domluveno.api.dto

import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.NotNull
import jakarta.validation.constraints.Size
import java.math.BigDecimal
import java.util.UUID

data class CreateRequestDto(
    @field:NotBlank @field:Size(max = 255)
    val title: String,
    val description: String? = null,
    val location: String? = null,
    val budget: BigDecimal? = null,
    val currency: String = "CZK",
    @field:NotNull
    val categoryId: Int,
)

data class RequestResponse(
    val id: UUID,
    val title: String,
    val description: String?,
    val location: String?,
    val budget: BigDecimal?,
    val currency: String,
    val status: String,
    val categoryId: Int,
    val requesterId: UUID,
)

data class CreateOfferDto(
    val message: String? = null,
    val price: BigDecimal? = null,
    val currency: String = "CZK",
)

data class OfferResponse(
    val id: UUID,
    val requestId: UUID,
    val providerId: UUID,
    val message: String?,
    val price: BigDecimal?,
    val currency: String,
    val status: String,
)

data class CreateConversationDto(
    val requestId: UUID?,
    val withUserId: UUID,
)

data class ConversationResponse(
    val id: UUID,
    val requestId: UUID?,
    val userA: UUID,
    val userB: UUID,
)

data class CreateMessageDto(
    @field:NotBlank @field:Size(max = 2000)
    val body: String
)

data class MessageResponse(
    val id: UUID,
    val conversationId: UUID,
    val senderId: UUID,
    val body: String,
    val createdAt: String,
    val readAt: String?,
)

