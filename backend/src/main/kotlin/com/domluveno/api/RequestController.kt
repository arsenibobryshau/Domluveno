package com.domluveno.api

import com.domluveno.api.dto.*
import com.domluveno.domain.ConversationEntity
import com.domluveno.domain.MessageEntity
import com.domluveno.domain.OfferEntity
import com.domluveno.domain.RequestEntity
import com.domluveno.repository.ConversationRepository
import com.domluveno.repository.MessageRepository
import com.domluveno.repository.OfferRepository
import com.domluveno.repository.RequestRepository
import com.domluveno.security.currentUserId
import jakarta.validation.Valid
import org.springframework.format.annotation.DateTimeFormat
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.time.Instant
import java.util.UUID

@RestController
@RequestMapping
class RequestController(
    private val requestRepository: RequestRepository,
    private val offerRepository: OfferRepository,
    private val conversationRepository: ConversationRepository,
    private val messageRepository: MessageRepository,
) {

    @GetMapping("/requests")
    fun listRequests(@RequestParam(required = false) categoryId: Int?): List<RequestResponse> {
        val requests = if (categoryId != null) {
            requestRepository.findAll().filter { it.categoryId == categoryId }
        } else {
            requestRepository.findAll()
        }
        return requests.map { it.toDto() }
    }

    @GetMapping("/requests/{id}")
    fun getRequest(@PathVariable id: UUID): ResponseEntity<RequestResponse> {
        val req = requestRepository.findById(id)
        return if (req.isPresent) ResponseEntity.ok(req.get().toDto()) else ResponseEntity.notFound().build()
    }

    @PostMapping("/requests")
    fun createRequest(@Valid @RequestBody body: CreateRequestDto): ResponseEntity<RequestResponse> {
        val userId = currentUserId() ?: return ResponseEntity.status(401).build()
        val entity = RequestEntity(
            requesterId = userId,
            categoryId = body.categoryId,
            title = body.title,
            description = body.description,
            location = body.location,
            budget = body.budget,
            currency = body.currency,
        )
        val saved = requestRepository.save(entity)
        return ResponseEntity.ok(saved.toDto())
    }

    @PostMapping("/requests/{id}/offers")
    fun createOffer(
        @PathVariable id: UUID,
        @Valid @RequestBody body: CreateOfferDto
    ): ResponseEntity<OfferResponse> {
        val userId = currentUserId() ?: return ResponseEntity.status(401).build()
        val request = requestRepository.findById(id).orElse(null) ?: return ResponseEntity.notFound().build()
        val offer = offerRepository.save(
            OfferEntity(
                requestId = request.id,
                providerId = userId,
                message = body.message,
                price = body.price,
                currency = body.currency,
            )
        )
        return ResponseEntity.ok(offer.toDto())
    }

    @PostMapping("/offers/{id}/accept")
    fun acceptOffer(@PathVariable id: UUID): ResponseEntity<OfferResponse> {
        val offerOpt = offerRepository.findById(id)
        if (offerOpt.isEmpty) return ResponseEntity.notFound().build()
        val offer = offerOpt.get()
        val updated = offer.copy(status = "accepted")
        offerRepository.save(updated)
        return ResponseEntity.ok(updated.toDto())
    }

    @PostMapping("/offers/{id}/reject")
    fun rejectOffer(@PathVariable id: UUID): ResponseEntity<OfferResponse> {
        val offerOpt = offerRepository.findById(id)
        if (offerOpt.isEmpty) return ResponseEntity.notFound().build()
        val offer = offerOpt.get()
        val updated = offer.copy(status = "rejected")
        offerRepository.save(updated)
        return ResponseEntity.ok(updated.toDto())
    }

    @PostMapping("/conversations")
    fun createConversation(@Valid @RequestBody body: CreateConversationDto): ResponseEntity<ConversationResponse> {
        val userId = currentUserId() ?: return ResponseEntity.status(401).build()
        val conv = conversationRepository.save(
            ConversationEntity(
                requestId = body.requestId,
                userA = userId,
                userB = body.withUserId,
            )
        )
        return ResponseEntity.ok(conv.toDto())
    }

    @GetMapping("/conversations/{id}/messages")
    fun getMessages(
        @PathVariable id: UUID,
        @RequestParam(required = false)
        @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
        after: Instant?
    ): ResponseEntity<List<MessageResponse>> {
        if (!conversationRepository.existsById(id)) return ResponseEntity.notFound().build()
        val msgs = if (after != null) {
            messageRepository.findByConversationIdAndCreatedAtAfterOrderByCreatedAtAsc(id, after)
        } else {
            messageRepository.findByConversationIdOrderByCreatedAtAsc(id)
        }
        return ResponseEntity.ok(msgs.map { it.toDto() })
    }

    @PostMapping("/conversations/{id}/messages")
    fun postMessage(
        @PathVariable id: UUID,
        @Valid @RequestBody body: CreateMessageDto
    ): ResponseEntity<MessageResponse> {
        val userId = currentUserId() ?: return ResponseEntity.status(401).build()
        if (!conversationRepository.existsById(id)) return ResponseEntity.notFound().build()
        val msg = messageRepository.save(
            MessageEntity(
                conversationId = id,
                senderId = userId,
                body = body.body
            )
        )
        return ResponseEntity.ok(msg.toDto())
    }

    private fun RequestEntity.toDto() = RequestResponse(
        id = id,
        title = title,
        description = description,
        location = location,
        budget = budget,
        currency = currency,
        status = status,
        categoryId = categoryId,
        requesterId = requesterId,
    )

    private fun OfferEntity.toDto() = OfferResponse(
        id = id,
        requestId = requestId,
        providerId = providerId,
        message = message,
        price = price,
        currency = currency,
        status = status
    )

    private fun ConversationEntity.toDto() = ConversationResponse(
        id = id,
        requestId = requestId,
        userA = userA,
        userB = userB
    )

    private fun MessageEntity.toDto() = MessageResponse(
        id = id,
        conversationId = conversationId,
        senderId = senderId,
        body = body,
        createdAt = createdAt.toString(),
        readAt = readAt?.toString()
    )
}

