package com.domluveno.repository

import com.domluveno.domain.ProfileEntity
import org.springframework.data.jpa.repository.JpaRepository
import java.util.UUID

interface ProfileRepository : JpaRepository<ProfileEntity, UUID>

