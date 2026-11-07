package com.sportyverse.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Table(name = "turfs")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Turf extends BaseEntity {
    
	 @Id
	 @GeneratedValue(strategy = GenerationType.IDENTITY)
	 private Long id;
	 
    @Column(nullable = false, length = 100)
    private String name;
    
    @Column(nullable = false)
    private String location;
    
    @Column(name = "sports_type", nullable = false, length = 100)
    private String sportsType;
    
    @Column(name = "price_per_hour", nullable = false, precision = 10, scale = 2)
    private BigDecimal pricePerHour;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    private Integer capacity;
    
    @Column(name = "available_from")
    private LocalTime availableFrom;
    
    @Column(name = "available_to")
    private LocalTime availableTo;
    
    @Column(name = "created_by")
    private Long createdBy;
    
}