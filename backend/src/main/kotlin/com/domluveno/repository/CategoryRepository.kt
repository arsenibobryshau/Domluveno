package com.domluveno.repository

import com.domluveno.domain.CategoryEntity
import org.springframework.data.jpa.repository.JpaRepository

interface CategoryRepository : JpaRepository<CategoryEntity, Int>

