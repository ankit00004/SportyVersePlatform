package com.sportyverse.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Table(name = "bookings")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Booking extends BaseEntity{
    
	 @Id
	 @GeneratedValue(strategy = GenerationType.IDENTITY)
	 private Long id;
    
    @Column(name = "turf_id", nullable = false)
    private Long turfId;
    
    @Column(name = "customer_id", nullable = false)
    private Long customerId;
    
    @Column(name = "booking_date", nullable = false)
    private LocalDate bookingDate;
    
    @Column(name = "start_time", nullable = false)
    private LocalTime startTime;
    
    @Column(name = "end_time", nullable = false)
    private LocalTime endTime;
    
    @Column(name = "total_hours", nullable = false)
    private Integer totalHours;
    
    @Column(name = "total_price", nullable = false, precision = 10, scale = 2)
    private BigDecimal totalPrice;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BookingStatus status = BookingStatus.CONFIRMED;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "payment_status", nullable = false)
    private PaymentStatus paymentStatus = PaymentStatus.PENDING;
    

    
    // Transient fields for joining data
    @Transient
    private String turfName;
    
    @Transient
    private String customerName;
    
    @Transient
    private String sportsType;
    
    @Transient
    private String location;
    
    
    public enum BookingStatus {
        PENDING, CONFIRMED, CANCELLED
    }
    
    public enum PaymentStatus {
        PENDING, PAID, REFUNDED
    }
}